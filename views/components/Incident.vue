<template>
    <div class="main d-flex flex-column" id="export-root">
        <div class="top d-flex">
            <div class="left d-flex">
                <div style="flex: 1 1 0; margin-right: 1.5vw; margin-left: 1.8vw">
                    <!-- image -->
                    <div id="export-image1" class="image1" />

                    <BR/>
                    <!-- Camera Label -->
                    <ivc-menu-camera-attributes label="Camera" :value="camera_value$" :items="cameras$" />
                    <!-- Attribute Label -->
                    <ivc-menu-camera-attributes label="Attribute" :value="attribute_value$" :items="attributes$" />
                    <!-- TimePeriod Label -->
                    <ivc-menu-time-attributes :value="timeperiod_value$" />

                </div>
                <div style="flex-basis: 120px">
                    <img id="export-image2" width="120px" height="120px" src="@/assets/images/image-m2.png" />
                </div>
            </div>
            <div class="right">
            </div>
        </div>
        <div class="bottom d-flex">
            <div class="left" style="margin-left: 2vw; margin-top: 1vh">
                <div style="margin-left: 0.4vw">Accompany</div>
                <div id="export-left-body" class="body1" style="margin-top: 1vh">
                    <img src="@/assets/images/image-m11.png" />
                    <img src="@/assets/images/image-m12.png" />
                </div>
            </div>
            <div id="export-right-body" class="right">
                <div id="export-toolbox" class="toolbox d-flex flex-column">
                    <iv-button variant="secondary" size="lg" @click="pdf_print()">PDF Report</iv-button>
                    <iv-button variant="secondary" size="lg" @click="html_export()">HTML Video Archive</iv-button>
                    <iv-button variant="secondary" size="lg">VMS Bookmark</iv-button>
                </div>

                <img src="@/assets/images/image-m21.png" />
                <img src="@/assets/images/image-m21.png" />
                <img src="@/assets/images/image-m21.png" />
                <img src="@/assets/images/image-m21.png" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@media print {
    .main {
        .top {
            .left {
                .image1 {
                    -webkit-print-color-adjust: exact;
                }
            }
        }
    }
}

.main {
    box-sizing: border-box;
    padding: 6vh 7vw;
    height: calc(100vh - #{$top-height});
    color: white;

    .top {
        border-bottom: 1px solid #031F22;
        flex: 17;

        .left {
            .image1 {
                aspect-ratio: 1 / 1;
                align-self: flex-start;
                background-image: url("~@/assets/images/image-m1.png");
                background-size:     cover;
                background-repeat:   no-repeat;
                background-position: center center;
            }
        }

        .right {
            background-image: url("~@/assets/images/image-m3.png");
            background-size:     cover;
            background-repeat:   no-repeat;
            background-position: center center;
            margin-bottom: 1vh;
        }
    }

    .bottom {
        border-top: 1px solid #8A9192;
        flex: 6;

        .left {
            .body1 {
                img {
                    margin-left: 0.3vw;
                    margin-right: 0.3vw;
                }
            }
        }

        .right {
            margin-top: 2.5vh;
            position: relative;

            .toolbox {
                position: absolute;
                right: 0;
                bottom: 0;

                button {
                    padding-left: 25px;
                    padding-right: 25px;
                    margin: 2px 0;
                }
            }
        }
    }

    .left {
        flex: 14;
        padding-right: 1.5vw;
        // background: red;
    }
    .right {
        flex: 25;
        img {
            float: left;
            margin: 1vh 0.2vw;
        }
        // background: blue;
    }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RegisterRouter } from '@/../core/router';
import { toEnumInterface } from '@/../core';
import { HtmlExporter } from '@/helpers/html-exporter';

@Component
export default class Incident extends Vue {
    private pdf_print() {
        window.print();
    }
    private async html_export() {
        let doc = HtmlExporter.cloneElementWithIdIntoDocument("export-root");

        /// handle images
        await HtmlExporter.transferElementsToDataUrl(document, doc,
            ["export-image1", "export-image2"]
        );

        await HtmlExporter.transferElementChildsToDataUrl(document, doc,
            ["export-left-body", "export-right-body"]
        );

        /// remove export-toolbox
        let toolbox = doc.getElementById("export-toolbox");
        toolbox.parentElement.removeChild(toolbox);

        // /// handle image1
        // let oriImage1 = document.getElementById("export-image1");
        // let image1 = doc.getElementById("export-image1");
        // let image1Url = window.getComputedStyle(oriImage1).backgroundImage.slice(5, -2);
        // let dataUrl = await HtmlExporter.getDataURLFromImageUrl(image1Url);
        // image1.style.backgroundImage = `url(${dataUrl})`;

        // /// handle image2
        // let oriImage2 = document.getElementById("export-image2");
        // let image2 = doc.getElementById("export-image2");
        // let image2Url = (image2 as any).src;
        // let dataUrl2 = await HtmlExporter.getDataURLFromImageUrl(image2Url);
        // (image2 as any).src = dataUrl2;

        /// do export
        HtmlExporter.zipDocumentIntoFile(doc, "export.zip");
    }
}
</script>
