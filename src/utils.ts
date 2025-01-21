import { desiredHTML, MetaTags } from "./types";
export async function fetchWebsite(website : string) {
    const url = 'https://corsproxy.io/?url=' + website;
    const data = await fetch(url,{
      cache: 'no-cache'
    });
    const result = await data.text();
    return result;
}

export const getHTMLContent = (htmlContent : string): desiredHTML => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent,'text/html');
    const textContent = doc.body.innerText;
    const links: string[] = Array.from(doc.querySelectorAll("a")).map((link) => link.href);
    const images: string[] = Array.from(doc.querySelectorAll("img")).map((img) => img.src);
    const headings: string[] = Array.from(doc.querySelectorAll("h1, h2, h3, h4, h5, h6")).map(
      (heading) => (heading as HTMLElement).innerText
    );
    const metaTags: MetaTags[] = Array.from(doc.querySelectorAll("meta")).map((meta) => ({
      name: meta.getAttribute("name") || "unknown",
      content: meta.getAttribute("content") || "unknown",
    }));
    return { textContent, links, images, headings, metaTags }
}