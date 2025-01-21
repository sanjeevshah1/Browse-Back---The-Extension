export interface MetaTags{
    name: string;
    content: string;
  }
  
export type desiredHTML = {
    textContent: string;
    links: string[];
    images: string[];
    headings: string[];
    metaTags: MetaTags[];
}

export type DisplayWebScrapProps = {
    fetchArray : string[];
    scrapeArray : desiredHTML[];
    index: number;
}