import { ExternalLink, Image, Heading2, FileText } from 'lucide-react';
import {DisplayWebScrapProps } from '../types';
const DisplayWebScrap = ({fetchArray,scrapeArray,index}:DisplayWebScrapProps ) => {
  return (
    <>
    {fetchArray[index] && (
        <div className="bg-purple-400/10 rounded-lg p-4">
            <p className="text-black mb-2 text-md text-bold">Raw HTML Preview:</p>
            <div className="text-purple-200 text-sm font-mono">
                {fetchArray[index].slice(0, 200)}
            </div>
        </div>
    )}
    {scrapeArray[index] && (
        <div className="bg-white/5 rounded-lg p-4">
            <p className="text-black mb-4 text-bold  text-md">Extracted Content:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                 <div className="space-y-2">
                        <h3 className="text-black font-medium text-sm flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Content
                        </h3>
                        <p className="text-purple-100 text-sm line-clamp-3">
                            {scrapeArray[index].textContent}
                        </p>
                 </div>

                <div className="space-y-2">
                            <h3 className="text-black font-medium text-sm flex items-center gap-2">
                              <ExternalLink className="w-4 h-4" />
                              Links
                            </h3>
                            <p className="text-purple-100 text-sm line-clamp-3">
                            {scrapeArray[index].links.join(", ")}
                            </p>
                </div>

                <div className="space-y-2">
                            <h3 className="text-black font-medium text-sm flex items-center gap-2">
                              <Image className="w-4 h-4" />
                              Images
                            </h3>
                            <p className="text-purple-100 text-sm line-clamp-3">
                              {scrapeArray[index].images.join(", ")}
                            </p>
                </div>

                <div className="space-y-2">
                            <h3 className="text-black font-medium text-sm flex items-center gap-2">
                              <Heading2 className="w-4 h-4" />
                              Headings
                            </h3>
                            <p className="text-purple-100 text-sm line-clamp-3">
                              {scrapeArray[index].headings.join(", ")}
                            </p>
                </div>
             </div>
        </div>
     )}
    </>
  )
}

export default DisplayWebScrap