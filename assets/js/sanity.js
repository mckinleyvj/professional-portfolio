async function fetchSanityDocument() {
		    
    const docId = "3da7a102-15ee-466a-a0d1-0bf58a1610b9"; //Replace this to relevant resource
    
    const pid = "Mmk4MGNrMDE=";
    const dts = "cHJvZHVjdGlvbg==";
    const tc = "c2tYYVVIcUpFNVdhdzFPeExXM0Y1TlM4SFUyQmM0bEhaN0F4ZWNWeldiUGhUa2RFRDhEYVlVdXlKY05sMHZyNnpMajBYWUMyRjIwODBzOW12aVZTSmE0SWNvem96SWF3emg5TmtCQXlOdjQweXlaR0tCb3JDRG5udmF4RXRjcGdzVU4wSUtWd29TcktDVTJ4cldBMjhGUTVVemx4eVBVZW9BTEttc3hqdzdtN3FmMXRTcWt6"; 
    
    const prjId = atob(pid);
    const ds = atob(dts);
    const aTc = atob(tc); 
            
    const resourceDoc = `https://${prjId}.api.sanity.io/v2021-06-07/data/query/${ds}?query=*[_id == "${docId}"]`;

    try {
      const response = await fetch(resourceDoc, {
        headers: {
          Authorization: `Bearer ${aTc}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const sanityDocument = data.result[0];

      if (sanityDocument) {
        document.getElementById('documentTitle').innerHTML = `${sanityDocument.title}`;
        document.getElementById("resourceType").innerHTML = `<strong>Resource Type:</strong> ${sanityDocument.resource_type}`;
        document.getElementById("resourceTime").innerHTML = `<strong>Time:</strong> ${sanityDocument.time} mins`;
        document.getElementById("resourceTime").style.marginBottom = "20px";
        
        const resourceTypeElement = document.getElementById("content");
        resourceTypeElement.innerHTML = "";
        
    
    } else {
            document.getElementById("title").innerText = "No document found with the specified ID.";
            document.getElementById("resourceType").innerText = "";
            document.getElementById("resourceTime").innerText = "";
            document.getElementById("content").innerText = "";
        }
    } catch (error) {
        console.error("Error fetching Sanity document:", error);
        document.getElementById("output").innerText = error.message;
      }
    }

fetchSanityDocument();