import {Fullwidth} from "~/components/clients/Fullwidth";
import {Noimage} from "~/components/clients/Noimage";
import {Twocolumns} from "~/components/clients/Twocolumns";
import {marked} from "marked";

export const NOIMAGE = 'noimage';
export const FULLWIDTH = 'fullwidth';
export const TWOCOLUMNS = 'twocolumns';
export const testMarkdown = `
# Test title  
## Test title 
### Test title 
#### Test title 
##### Test title 
###### Test title 

Other text 

**Tiny Elephant** har hjulpet Element Studio med deres nye Magento 2 nettbutikk. Herunder integrasjon mot deres forretningssystem Visma Business som synkroniserer ordre, varer, lagerstatus og kunder med nettbutikken.   
Butikken har også Algolia søk for en optimalisert søkefunksjon og Klarna Checkout for en «smooth» betalingsopplevelse.    

*Lorem ipsum dolor sit amet* praesent incididunt posuere. Velit duis nec hac facilisis odio nunc tristique aliquam. Sagittis consectetur gravida hendrerit convallis elit lobortis a pulvinar nulla risus faucibus. Phasellus pharetra aliqua lacus posuere netus urna nibh velit ullamcorper erat aliquet. Tempor semper integer platea malesuada semper luctus eleifend vel arcu.   

> Volutpat aenean feugiat sed viverra velit congue eiusmod nisi curabitur laoreet. Imperdiet magna convallis rhoncus proin blandit senectus porttitor dapibus aliquet augue. Augue proin habitasse fames id eget sed etiam nibh risus nulla tempus donec neque ultrices. Platea consequat leo molestie consequat dictum laoreet turpis blandit mauris ullamcorper viverra est. Feugiat volutpat in leo posuere nisl fringilla condimentum non ultrices imperdiet justo nulla volutpat urna.   

![Tux, the Linux mascot](/images/tux.png)

##### Unordered List
* First
* Second 
* Third  
   * First
   * Second 
   * Third  
   * 4th item
* 4th item

\`\`Use \`code\` in your Markdown file.\`\`

My favorite search engine is [Duck Duck Go](https://duckduckgo.com "The best search engine for privacy").

<https://www.markdownguide.org>  
<fake@example.com>

##### Ordered List
1. First
2. Second 
3. Third  
`;

export const ClientsTemplate = (props) => {
    const {markdown, template, ...client } = props.clientData.client;

    if (!client.pageImageUrl) {
        client.pageImageUrl = "/images/element.jpg"
    }

    const templates = {
        'fullwidth': <Fullwidth client={ client }/>,
        'twocolumns': <Twocolumns client={ client }/>,
        'noimage': <Noimage client={ client }/>
    }

    return (
        <>
            { templates[template] }
            <div className={"markdown max-w-[960px] px-10 py-6 mx-auto"} dangerouslySetInnerHTML={{ __html: marked(markdown || testMarkdown ) }} />
        </>
    )
}