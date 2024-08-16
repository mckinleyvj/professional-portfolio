async function fetchSanityDocument() {
		    
    const docId = "3da7a102-15ee-466a-a0d1-0bf58a1610b9"; //Replace this to relevant resource
    
    const pid = "Mmk4MGNrMDE=";
    const dts = "cHJvZHVjdGlvbg==";
    const tc = "c2thQlBnVFl1VWFmYUZTcnVjT1d5NWswOEdZaDRiSW1ua1hub3hqZDNsNHBFMVVGVjgyOUI4VGhPU1pVQjV1bnhJZWhMUEdlRk12M1pIbElQeG9LdVNkMll4Yno1QzRweWZIS1IycHZJajZkRDVzc3lWczZEcFYwajhuaEQ1cGRKRnY5b210d0hHNUdPZ2N3ejhJM0pLaGd3SW9vWW1MNkY5Q0trcTdnR1N1bUluTnkzVklU"; 
    
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
    } catch (error) {
        console.error("Error fetching Sanity document:", error);
        document.getElementById("output").innerText = error.message;
      }
    }

fetchSanityDocument();