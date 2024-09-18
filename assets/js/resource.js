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
            //  // Create a table
            // let table = `<table><tr><th style="border: black 1px solid;">Title</th><th style="border: black 1px solid;">Language</th></tr>`;
            // sanityDocuments.forEach(doc => {
            //     table += `<tr><td>${doc.title}</td><td>${doc.__i18n_lang}</td></tr>`;
            // });
            // table += '</table>';
            // Function to format date
            function formatDate(dateString) {
                const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
                return new Date(dateString).toLocaleDateString('en-GB', options).replace(',', '');
            }


            // Create a table
            let table = `<table style="border-collapse: collapse; width: 100%;"><tr class="tableheaders"><th>ID</th><th>Title</th><th>Resource Type</th><th>Language</th><th>Created At</th><th>Updated At</th></tr>`;
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