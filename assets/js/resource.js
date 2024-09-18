async function fetchSanityResourceList() {
    const pid = "Mmk4MGNrMDE=";
    const dts = "cHJvZHVjdGlvbg==";
    const tc = "c2tYYVVIcUpFNVdhdzFPeExXM0Y1TlM4SFUyQmM0bEhaN0F4ZWNWeldiUGhUa2RFRDhEYVlVdXlKY05sMHZyNnpMajBYWUMyRjIwODBzOW12aVZTSmE0SWNvem96SWF3emg5TmtCQXlOdjQweXlaR0tCb3JDRG5udmF4RXRjcGdzVU4wSUtWd29TcktDVTJ4cldBMjhGUTVVemx4eVBVZW9BTEttc3hqdzdtN3FmMXRTcWt6"; 
    
    const prjId = atob(pid);
    const ds = atob(dts);
    const aTc = atob(tc); 
            
    const query = '*[_type == "topic"]';
  
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
      const sanityDocument = data.result[0];

      console.log(sanityDocument);
      if(sanityDocument) {
            // Create a table
            let table = '<table><tr><th>Title</th></tr>';
            sanityDocument.forEach(doc => {
                table += `<tr><td>${doc.title}</td></tr>`;
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