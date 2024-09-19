async function fetchSanityDocument() {
		    
    //const docId = "3da7a102-15ee-466a-a0d1-0bf58a1610b9"; //Replace this to relevant resource
    //const docId ="929399a8-6128-4767-a729-60cdd882afa2"; //Storyline
    //const docId = "44e22451-109f-45a1-a61e-0df39fe7fab3"; //Video
    const docId = "5a2ac4a3-4234-4663-9f15-b96bdc55cebc"; //Bookwidget
    
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

      if (sanityDocument) {
        document.getElementById('documentTitle').innerHTML = `<h2>${sanityDocument.title}</h2>`;
        document.getElementById("resourceType").innerHTML = `<span><strong>Resource Type:</strong> ${sanityDocument.resource_type}</span>`;
        document.getElementById("resourceTime").innerHTML = `<span><strong>Time:</strong> ${sanityDocument.time} mins</span>`;
        document.getElementById("resourceTime").style.marginBottom = "20px";
        
        const resourceTypeElement = document.getElementById("content");
        resourceTypeElement.innerHTML = "";
        
        sanityDocument.body.forEach((item) => {
          if (item._type === "block") { //Resource text block section
            let blockElement;

            if (item.listItem === "bullet") { //Resource text block in bullets section
              blockElement = document.createElement("ul");

              let listItem = document.createElement("li");

              item.children.forEach((child) => {
                if (child._type === "span") {
                  const span = document.createElement("span");

                  if (child.marks.includes("strong")) { 
                    const strongText = document.createElement("strong");
                    strongText.textContent = child.text;
                    span.appendChild(strongText);
                  } else {
                    span.textContent += child.text;
                  }

                  listItem.appendChild(span); 
                }
              });

              blockElement.appendChild(listItem);
            } else {
              blockElement = document.createElement("div");

              item.children.forEach((child) => {
                const span = document.createElement("span");

                if (child.marks.includes("strong")) {
                  const strongText = document.createElement("strong");
                  strongText.textContent = child.text;
                  span.appendChild(strongText);
                } else {
                  span.textContent += child.text;
                }

                blockElement.appendChild(span);
              });
            }

            blockElement.className = "content";
            blockElement.style.marginBottom = item.listItem === "bullet" ? "20px" : "10px";
            blockElement.style.marginTop = "10px";

            if (item.style === "h5") {
              blockElement.style.fontSize = "20px";
              blockElement.style.fontWeight = "900";
            }

            resourceTypeElement.appendChild(blockElement);

          } else if (item._type === "image") { //Resource image block section

            const imgElement = document.createElement("img");

            const imgRef = item.asset._ref;
            const imgRefType = imgRef.replace("image-", "");
            const imgRefMod = imgRefType.replace(/-(jpg|png|bmp)$/, '.$1');

            const imgUrl = `https://cdn.sanity.io/images/${prjId}/~${ds}/${imgRefMod}?w=800`;

            if (imgUrl) {
              imgElement.src = imgUrl;
            } else {
              console.error("Image URL not found in the item object.");
            }
    
            //imgElement.alt = item.asset[0].altText || "Image";
            imgElement.style.maxWidth = "100%";

            const imageWrapper = document.createElement("div");
            imageWrapper.className = "image-block";
            imageWrapper.appendChild(imgElement);
    
            resourceTypeElement.appendChild(imageWrapper);
    
          } else if (item._type === "video_reference") { //Resource video reference section
            const videoDoc = `https://${prjId}.api.sanity.io/v2021-06-07/data/query/${ds}?query=*[_id == "${item._ref}"]`;

            fetch(videoDoc, {
                headers: {
                  Authorization: `Bearer ${aTc}`,
                  "Content-Type": "application/json",
                  'Referrer-Policy': 'no-referrer',
                  'X-Frame-Options': 'sameorigin',
                  'X-Content-Type-Options': 'nosniff',
                  'Permissions-Policy': 'accelerometer=(),autoplay=(),camera=(),display-capture=(),document-domain=(),encrypted-media=(),fullscreen=(),geolocation=(),gyroscope=(),magnetometer=(),microphone=(),midi=(),payment=(),picture-in-picture=(),publickey-credentials-get=(),screen-wake-lock=(),sync-xhr=(self),usb=(),web-share=(),xr-spatial-tracking=()',
                  'Content-Security-Policy': "default-src 'none';",
                },
              })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(
                    `HTTP error! status: ${response.status}`);
                }
                return response.json();
              })
              .then((videoData) => {
                const video = videoData.result[0];

                if (video) {
                  const embedLinkHTML = video.embedlink;
                  const parser = new DOMParser();
                  const doc = parser.parseFromString(embedLinkHTML, "text/html");
                  const iframe = doc.querySelector("iframe");

                  if (iframe) {
                    const src = iframe.getAttribute("src");
                    const videoIframe = document.createElement("iframe");
                    const width = iframe.getAttribute("width") || 640;
                    const aspectRatio = 9 / 16;
                    const height = width * aspectRatio;

                    videoIframe.src = src;
                    videoIframe.width = width;
                    videoIframe.height = height;
                    videoIframe.align = "left";
                    videoIframe.frameBorder = "0";
                    videoIframe.allow = "autoplay; fullscreen";
                    videoIframe.allowFullscreen = true;

                    resourceTypeElement.appendChild(videoIframe);
                  }
                } else {
                  const errorText = document.createElement("p");
                  errorText.textContent = "No video found with the specified reference.";
                  resourceTypeElement.appendChild(errorText);
                }
              })
              .catch((error) => {
                console.error("Error fetching video document:", error);
              });
          } else if (item._type === "storyline_reference") { //Resource with storyline reference section
            const storylineDoc = `https://${prjId}.api.sanity.io/v2021-06-07/data/query/${ds}?query=*[_id == "${item._ref}"]`;
  
            fetch(storylineDoc, {
                headers: {
                  Authorization: `Bearer ${aTc}`,
                  "Content-Type": "application/json",
                  'Referrer-Policy': 'no-referrer',
                  'X-Frame-Options': 'sameorigin',
                  'X-Content-Type-Options': 'nosniff',
                  'Permissions-Policy': 'accelerometer=(),autoplay=(),camera=(),display-capture=(),document-domain=(),encrypted-media=(),fullscreen=(),geolocation=(),gyroscope=(),magnetometer=(),microphone=(),midi=(),payment=(),picture-in-picture=(),publickey-credentials-get=(),screen-wake-lock=(),sync-xhr=(self),usb=(),web-share=(),xr-spatial-tracking=()',
                  'Content-Security-Policy': "default-src 'none';",
                },
              })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
              })
              .then((storylineData) => {
                const storyline = storylineData.result[0];

                if (storyline) {
                  const storylineLink = storyline.embedlink;
                  const parser = new DOMParser();
                  const doc2 = parser.parseFromString(storylineLink, "text/html");
                  const iframe = doc2.querySelector("iframe");

                  if (iframe) {
                    const src = iframe.getAttribute("src");
                    //const src = "https://tinyurl.com/4ywz8n86";
                    //const src = "https://apm.eskilled.com.au/pluginfile.php/91094/mod_resource/content/4/Communicaton%20skills.wdgt/index.html"; //Replace this URL to uploaded storyline file in eskilled
                    const extWindowWidth = window.screen.width;
                    const extWindowHeight = window.screen.height;

                    const tileImgRef = storyline.feature_image.asset._ref;

                    const tileImgMod1 = tileImgRef.replace("image-", "");
                    const tileImgMod2 = tileImgMod1.replace(/-(jpg|png|bmp)$/, '.$1');

                    const tileImgUrl = `https://cdn.sanity.io/images/${prjId}/~${ds}/${tileImgMod2}?w=300&h=300`

                    const storylineBtn = document.createElement("button");
                    storylineBtn.style.borderRadius = "8px";
                    storylineBtn.style.border = 'none';
                    storylineBtn.style.width = "300px";
                    storylineBtn.style.height = "300px";
                    storylineBtn.style.backgroundImage = `url(${tileImgUrl})`;
                    storylineBtn.style.backgroundPosition = "center";

                    storylineBtn.onmouseover = function() {
                      this.style.opacity = '0.8';
                      this.style.border = '0.5px solid #000';
                    };

                    storylineBtn.onmouseout = function() {
                      this.style.opacity = '1';
                      this.style.border = 'none';
                    };

                    function openNewTab(theSrc) {
                      window.open(theSrc, 
                        "_blank",
                        `toolbar=no,menubar=no,scrollbars=yes,resizable=no,width=${extWindowWidth},height=${extWindowHeight}`
                      );
                    }

                    storylineBtn.addEventListener("click", function() {
                        // const newWindow = window.open(src,
                        // '_blank',
                        //   `toolbar=no,menubar=no,scrollbars=yes,resizable=no,width=${extWindowWidth},height=${extWindowHeight}`
                        // );
                        openNewTab(src);
                      });

                    resourceTypeElement.appendChild(storylineBtn);
                    
                  }
                } else {
                  const errorText = document.createElement("p");
                  errorText.textContent = "No storyline found with the specified reference.";
                  resourceTypeElement.appendChild(errorText);
                }
              })
              .catch((error) => {
                console.error("Error fetching storyline document:", error);
              });
          } else if (item._type === "bookwidget_reference") { //Resource with bookwidget reference section
            const bookwidgetDoc = `https://${prjId}.api.sanity.io/v2021-06-07/data/query/${ds}?query=*[_id == "${item._ref}"]`;

            fetch(bookwidgetDoc, {
                headers: {
                  Authorization: `Bearer ${aTc}`,
                  "Content-Type": "application/json",
                  'Referrer-Policy': 'no-referrer',
                  'X-Frame-Options': 'sameorigin',
                  'X-Content-Type-Options': 'nosniff',
                  'Permissions-Policy': 'accelerometer=(),autoplay=(),camera=(),display-capture=(),document-domain=(),encrypted-media=(),fullscreen=(),geolocation=(),gyroscope=(),magnetometer=(),microphone=(),midi=(),payment=(),picture-in-picture=(),publickey-credentials-get=(),screen-wake-lock=(),sync-xhr=(self),usb=(),web-share=(),xr-spatial-tracking=()',
                  'Content-Security-Policy': "default-src 'none';",
                },
              })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
              })
              .then((bookwidgetData) => {
                const bookwidget = bookwidgetData.result[0];

                if (bookwidget) {
                  const bookwidgetLink = bookwidget.embedlink;
                  const parser = new DOMParser();
                  const doc2 = parser.parseFromString(bookwidgetLink, "text/html");
                  const iframe = doc2.querySelector("iframe");

                  if (iframe) {
                    const src = iframe.getAttribute("src");
                    //const src = "https://apm.eskilled.com.au/pluginfile.php/91094/mod_resource/content/4/Communicaton%20skills.wdgt/index.html"; //Replace this URL to uploaded bookwidget file in eskilled 
                    const extWindowWidth = window.screen.width;
                    const extWindowHeight = window.screen.height;

                    const tileImgRef = bookwidget.feature_image.asset._ref;

                    const tileImgMod1 = tileImgRef.replace("image-", "");
                    const tileImgMod2 = tileImgMod1.replace(/-(jpg|png|bmp)$/, '.$1');

                    const tileImgUrl = `https://cdn.sanity.io/images/${prjId}/~${ds}/${tileImgMod2}?w=300&h=300`

                    const bookwidgetBtn = document.createElement("button");
                    bookwidgetBtn.style.borderRadius = "8px";
                    bookwidgetBtn.style.border = 'none';
                    bookwidgetBtn.style.width = "300px";
                    bookwidgetBtn.style.height = "300px";
                    bookwidgetBtn.style.backgroundImage = `url(${tileImgUrl})`;
                    bookwidgetBtn.style.backgroundPosition = "center";

                    bookwidgetBtn.onmouseover = function() {
                      this.style.opacity = '0.8';
                      this.style.border = '0.5px solid #000';
                    };

                    bookwidgetBtn.onmouseout = function() {
                      this.style.opacity = '1';
                      this.style.border = 'none';
                    };

                    function openNewTab(theSrc) {
                      window.open(theSrc, 
                        "_blank",
                        `toolbar=no,menubar=no,scrollbars=yes,resizable=no,width=${extWindowWidth},height=${extWindowHeight}`
                      );
                    }

                    bookwidgetBtn.addEventListener("click", function() {
                        // const newWindow = window.open(src,
                        // '_blank',
                        //   `toolbar=no,menubar=no,scrollbars=yes,resizable=no,width=${extWindowWidth},height=${extWindowHeight}`
                        // );
                        openNewTab(src);
                      });

                    resourceTypeElement.appendChild(bookwidgetBtn);

                  }
                } else {
                  const errorText = document.createElement("p");
                  errorText.textContent = "No bookwidget found with the specified reference.";
                  resourceTypeElement.appendChild(errorText);
                }
              })
              .catch((error) => {
                console.error(
                  "Error fetching bookwidget document:", error
                );
              });
          }
        });
    } else {
            document.getElementById("documentTitle").innerText = "No document found with the specified ID.";
            document.getElementById("resourceType").innerText = "";
            document.getElementById("resourceTime").innerText = "";
            document.getElementById("content").innerText = "";
        }
    } catch (error) {
        console.error("Error fetching Sanity document:", error);
        document.getElementById("content").innerText = error.message;
      }
    }

fetchSanityDocument();