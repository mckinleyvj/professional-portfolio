async function fetchSanityResourceList() {
    const pid = "Mmk4MGNrMDE=";
    const dts = "cHJvZHVjdGlvbg==";
    const tc = "c2tYYVVIcUpFNVdhdzFPeExXM0Y1TlM4SFUyQmM0bEhaN0F4ZWNWeldiUGhUa2RFRDhEYVlVdXlKY05sMHZyNnpMajBYWUMyRjIwODBzOW12aVZTSmE0SWNvem96SWF3emg5TmtCQXlOdjQweXlaR0tCb3JDRG5udmF4RXRjcGdzVU4wSUtWd29TcktDVTJ4cldBMjhGUTVVemx4eVBVZW9BTEttc3hqdzdtN3FmMXRTcWt6"; 
    
    const prjId = atob(pid);
    const ds = atob(dts);
    const aTc = atob(tc); 
            
    //const query = `*[_type == 'topic' && __i18n_lang == 'en'] | order(title) {_type,title,resource_type,__i18n_lang,_createdAt,_updatedAt}`;
    //const query = `*[_type == 'topic' && __i18n_lang == 'en' && !(_id in path("drafts.**"))] | order(title) {_id,_type,title,resource_type,__i18n_lang,_createdAt,_updatedAt}`;
    //const query = `*[_type == 'topic' && !(_id in path("drafts.**"))] | order(__i18n_lang asc, _updatedAt desc) {_id,_type,title,resource_type,__i18n_lang,_createdAt,_updatedAt}`;
    const query = `*[_type == 'topic' && !(_id in path("drafts.**"))] | order(_updatedAt desc) {_id,_type,title,resource_type,__i18n_lang,_createdAt,_updatedAt}`;

    //const resourceDoc = `https://${prjId}.api.sanity.io/v1/data/query/${ds}?query=*[_id == "${docId}"]`;
    const resourceDoc = `https://${prjId}.api.sanity.io/v1/data/query/${ds}?query=${encodeURIComponent(query)}`;
  
    try {
     // Make the API call
     const response = await fetch(resourceDoc, {
        headers: {
          Authorization: `Bearer ${aTc}`,
          "Content-Type": "application/json",
          'Referrer-Policy': 'no-referrer',
          'X-Frame-Options': 'sameorigin',
          'X-Content-Type-Options': 'nosniff',
          'Permissions-Policy': 'accelerometer=(),autoplay=(),camera=(),display-capture=(),document-domain=(),encrypted-media=(),fullscreen=(),geolocation=(),gyroscope=(),magnetometer=(),microphone=(),midi=(),payment=(),picture-in-picture=(),publickey-credentials-get=(),screen-wake-lock=(),sync-xhr=(self),usb=(),web-share=(),xr-spatial-tracking=()',
          'Content-Security-Policy': "default-src 'none';",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const sanityDocuments = data.result;

      if(sanityDocuments) {
            // Function to format date
            function formatDate(dateString) {
                const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
                return new Date(dateString).toLocaleDateString('en-GB', options).replace(',', '');
            }

             // Get unique languages and resource types
             const languages = [...new Set(sanityDocuments.map(doc => doc.__i18n_lang))];
             const resourceTypes = [...new Set(sanityDocuments.map(doc => doc.resource_type))];
             const languageFilter = document.getElementById("languageFilter");
             const resourceTypeFilter = document.getElementById("resourceTypeFilter");

             // Populate the language dropdown
            languages.forEach(lang => {
                const option = document.createElement("option");
                option.value = lang;
                option.text = lang;
                languageFilter.appendChild(option);
            });

            // Populate the resource type dropdown
            resourceTypes.forEach(type => {
                const option = document.createElement("option");
                option.value = type;
                option.text = type;
                resourceTypeFilter.appendChild(option);
            });

             // Create a table
             let table = `<table style="border-collapse: collapse; width: 100%; table-layout: fixed;">
             <tr class="tableheaders">
                 <th style="max-width: 365px; width: 365px;">ID</th>
                 <th style="max-width: 520px; width: 520px;">Title</th>
                 <th style="max-width: 103px; width: 103px;">Resource Type</th>
                 <th style="max-width: 70px; width: 70px;">Language</th>
                 <th style="max-width: 133px; width: 133px;">Created At</th>
                 <th style="max-width: 133px; width: 133px;">Updated At</th>
             </tr>`;
            sanityDocuments.forEach(doc => {
            table += `<tr class="tablerows">
                        <td class="tablecells">${doc._id}</td>
                        <td class="tablecells">${doc.title}</td>
                        <td class="tablecells">${doc.resource_type}</td>
                        <td class="tablecells">${doc.__i18n_lang}</td>
                        <td class="tablecells">${formatDate(doc._createdAt)}</td>
                        <td class="tablecells">${formatDate(doc._updatedAt)}</td>
                    </tr>`;
            });
            table += '</table>';

            // Insert the table into the div with id "contentlist"
            document.getElementById("contentlist").innerHTML = table;
        } else {
            document.getElementById("contentlist").innerText = "";
        }

    } catch (error) {
        console.error("Error fetching Sanity document:", error);
        document.getElementById("content").innerText = error.message;
      }
  }
  
  fetchSanityResourceList();

  function filterTable() {
    const selectedLanguage = document.getElementById("languageFilter").value;
    const selectedResourceType = document.getElementById("resourceTypeFilter").value;
    const rows = document.querySelectorAll("#contentlist .tablerows");

    rows.forEach(row => {
        const language = row.querySelector(".tablecells:nth-child(4)").textContent;
        const resourceType = row.querySelector(".tablecells:nth-child(3)").textContent;
        if ((selectedLanguage === "all" || language === selectedLanguage) &&
            (selectedResourceType === "all" || resourceType === selectedResourceType)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}