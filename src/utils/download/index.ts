/**
 * @description
 * Downloads a file passing a type, base64 and a prefix.
 */
export function download(type: string, base64: string, prefix?: string) {
    const decode = window?.atob(base64);
  
    const byteNumbers = new Array(decode.length);
  
    for (let i = 0; i < decode.length; i++) {
      byteNumbers[i] = decode.charCodeAt(i);
    }
  
    const byteArray = new Uint8Array(byteNumbers);
  
    const blob = new Blob([byteArray], { type });
  
    const link = document.createElement("a");
  
    document.body.appendChild(link);
  
    const url = window.URL || window.webkitURL;
  
    Object.assign(link, {
      download: prefix,
      style: "display:none",
      href: url.createObjectURL(blob),
    });
  
    link.click();
  
    url.revokeObjectURL(link.href);
  
    link.remove();
  }
  
  export function downloadAsSource(
    ext: string,
    type: string,
    base64: string,
    prefix?: string
  ) {
    const anchor = document.createElement("a");
    anchor.href = `data:${type};base64,${base64}`;
    anchor.download = `${prefix}.${ext}`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  }