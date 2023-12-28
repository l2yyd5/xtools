/** converting camel-cased strings to be lowercase and link it with Separato */
export function toLowercaseSeparator(key: string) {
  return key.replace(/([A-Z])/g, '-$1').toLowerCase();
}

export function getStyleStr(style: React.CSSProperties): string {
  return Object.keys(style)
    .map(
      // @ts-ignore
      (key: keyof React.CSSProperties) =>
        `${toLowercaseSeparator(key)}: ${style[key]};`
    )
    .join(' ');
}

/** Returns the ratio of the device's physical pixel resolution to the css pixel resolution */
export function getPixelRatio() {
  return window.devicePixelRatio || 1;
}

/** Whether to re-render the watermark */
export const reRendering = (
  mutation: MutationRecord,
  isWatermarkEle: (ele: any) => boolean
) => {
  let flag = false;
  // Whether to delete the watermark node
  if (mutation.removedNodes.length) {
    flag = Array.from(mutation.removedNodes).some((node) =>
      isWatermarkEle(node)
    );
  }
  // Whether the watermark dom property value has been modified
  if (mutation.type === 'attributes' && isWatermarkEle(mutation.target)) {
    flag = true;
  }
  return flag;
};

export const downloadFile = (
  base64Data: string,
  name: string = 'image.png'
) => {
  const b64encoded = base64Data.replace(/^data:image\/\w+;base64,/, '');
  const rawData = atob(b64encoded);
  const arrayBuffer = Uint8Array.from(rawData, (c) => c.charCodeAt(0));
  const blob = new Blob([arrayBuffer], { type: 'image/png' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
};
