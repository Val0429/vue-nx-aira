import JSZip from 'jszip';
import { saveAs } from 'filesaver.js';

export class HtmlExporter {
    static cloneElementWithIdIntoDocument(elementId: string): Document {
        let doc = document.implementation.createHTMLDocument();
        doc.documentElement.appendChild(document.createElementNS('http://www.w3.org/1999/xhtml', 'body'));
        doc.body.innerHTML = document.body.innerHTML;
        let targetNode = doc.getElementById(elementId);

        /// get body
        let childNode;
        while (targetNode.tagName != "BODY") {
            childNode = targetNode;
            targetNode = targetNode.parentElement;
            let child = targetNode.lastElementChild;
            while (child) {
                targetNode.removeChild(child);
                child = targetNode.lastElementChild;
            }
            targetNode.appendChild(childNode);
        }
        /// get css
        const allCSS = [...document.styleSheets]
            .map((styleSheet: any) => {
                try {
                    return [...styleSheet.cssRules]
                        .map(rule => rule.cssText)
                        .join("");
                } catch(e) {
                    /// access denied
                }
            })
            .filter(Boolean)
            .join("\n");
        let head = doc.head || doc.getElementsByTagName("head")[0];
        let ss = doc.createElement("style");
        ss.type = "text/css";
        head.appendChild(ss);
        ss.appendChild(doc.createTextNode(allCSS));

        return doc;
    }

    static zipDocumentIntoFile(doc: Document, filename: string) {
        const zip = new JSZip();
        zip.file("index.html", doc.documentElement.outerHTML);
        zip.generateAsync({type:"blob"}).then(content => {
            saveAs(content, filename);
        });
    }

    static async getDataURLFromImageUrl(url: string) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.onload = () => {
                let fileReader = new FileReader();
                fileReader.onloadend = (event) => {
                    resolve(fileReader.result);
                };
                fileReader.readAsDataURL(xhr.response);    
            };
            xhr.open("GET", url);
            xhr.responseType = "blob";
            xhr.send();    
        });
    }

    static async transferElementsToDataUrl(originalDocument: Document, doc: Document, elementIds: string[]) {
        await Promise.all(
            elementIds.map(
                id => HtmlExporter.transferElementToDataUrl(originalDocument, doc, id)
            )
        );
    }

    static async transferOriginalElementAndElementToDataUrl(originalElement: HTMLElement, element: HTMLElement) {
        switch (element.tagName) {
            case "IMG": {
                let imageUrl = (originalElement as any).src;
                console.log("image url!", imageUrl);
                let dataUrl = await HtmlExporter.getDataURLFromImageUrl(imageUrl);
                (element as any).src = dataUrl;
            } break;
            default: {
                let imageUrl = window.getComputedStyle(originalElement).backgroundImage.slice(5, -2);
                let dataUrl = await HtmlExporter.getDataURLFromImageUrl(imageUrl);
                element.style.backgroundImage = `url(${dataUrl})`;
            } break;
        }
    }

    static async transferElementToDataUrl(originalDocument: Document, doc: Document, elementId: string) {
        let originalElement = originalDocument.getElementById(elementId);
        let element = doc.getElementById(elementId);

        await HtmlExporter.transferOriginalElementAndElementToDataUrl(originalElement, element);
    }

    static async transferElementChildsToDataUrl(originalDocument: Document, doc: Document, elementId: string | string[]) {
        if (Array.isArray(elementId)) {
            await Promise.all(
                elementId.map(id => HtmlExporter.transferElementChildsToDataUrl(originalDocument, doc, id))
            );
            return;
        }
        
        let originalElement = originalDocument.getElementById(elementId);
        let element = doc.getElementById(elementId);

        let promises = [];
        for (let ochild = originalElement.firstChild, child = element.firstChild;
             ochild != null && child != null;
             ochild = ochild.nextSibling, child = child.nextSibling) {
                promises.push(
                    HtmlExporter.transferOriginalElementAndElementToDataUrl(ochild as any, child as any)
                );
            }
        await Promise.all(promises);
    }
}

function findNodesWithBackgroundImage(doc) {
    let elements = doc.getElementsByTagName("*");
    let tmp = [];
    for (let o in elements) {
        let element = elements[o];
        if (!element || !element.tagName) continue;
        console.log("element!", element, typeof element, element.tagName, window.getComputedStyle(element).backgroundImage, "hihi");
        if (window.getComputedStyle(element).backgroundImage) {
            tmp.push(element);
        }
    }
    return tmp;
}