import Image from "next/image";
import { parse } from 'node-html-parser';
import OlympicTable from "./olympic_table";

export async function Board() {
    const wikipage = "https://en.wikipedia.org/wiki/2024_Summer_Olympics_medal_table";
    const response = await fetch(wikipage)
    const responseText = await response.text()
    const data = await getOlympicTableDataFromWeb(responseText)

    return <OlympicTable data={data} />
}

async function getOlympicTableDataFromWeb(html: string) {
    // get body of the response and the DOM and then parse it
      const doc = parse(html);
      // get the table element
      const table = doc.querySelector("table.wikitable");
      if (!table) {
        console.error("Table not found");
        return [];
      }
      // get the rows of the table
      const rows = table.querySelectorAll("tr");
      // create an array to store the data
      const data: any[] = [];
      // iterate over the rows
      const maxCountry = 20;
      let countryCount = 0;
      rows.forEach((row) => {
        if (countryCount >= maxCountry) {
          return;
        }
        // get the cells of the row
        const cells = row.querySelectorAll("td");
        // create an array to store the cell data
        const rowData: any = [];
        // iterate over the cells
        cells.forEach((cell: any) => {
          // get the text content of the cell and push it to the array
          rowData.push(cell.textContent.trim());
        });
        // push the row data to the data array
        data.push(rowData);

        // the country name and logo is in a <th> element
        /**
         * <th scope="row" style="background-color:#ffffff;color:#202122;text-align:left"><span class="mw-image-border" typeof="mw:File"><span><img alt="" src="//upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/22px-Flag_of_the_People%27s_Republic_of_China.svg.png" decoding="async" width="22" height="15" class="mw-file-element" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/33px-Flag_of_the_People%27s_Republic_of_China.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/44px-Flag_of_the_People%27s_Republic_of_China.svg.png 2x" data-file-width="900" data-file-height="600"></span></span>&nbsp;<a href="/wiki/China_at_the_2024_Summer_Olympics" title="China at the 2024 Summer Olympics">China</a></th>
         */
        const country = row.querySelector("th");
        if (country) {
          // get the country name
          const countryName = country.querySelector("a")?.textContent;
          // get the country logo
          const countryLogo = country.querySelector("img")?.getAttribute("src");
          // log the country name and logo
          // push the country name and logo to the row data but as first elements of array
          rowData.unshift(countryName);
          rowData.unshift("https:" + countryLogo);
        }
        // increment the country count
        countryCount++;
      });

      // remove the first element beacyse it is the header row

      data.shift()
      // log the data
      // return the data
      return data;
}