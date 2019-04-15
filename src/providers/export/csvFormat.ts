import _ from "lodash";
import { ExportProvider } from "./exportProvider";
import { IProject, IAssetMetadata, IExportProviderOptions } from "../../models/applicationState";
import Guard from "../../common/guard";
import HtmlFileReader from "../../common/htmlFileReader";

/**
 * @name - CSV Format Export Provider
 * @description - Exports a project into a single CSV file that include all configured assets
 */
export class CSVFormatExportProvider extends ExportProvider {
    constructor(project: IProject, options: IExportProviderOptions) {
        super(project, options);
        Guard.null(options);
    }

    /**
     * Export project to CSV
     */
    public async export(): Promise<void> {
        const csvBuffer: string[] = [];
        const results = await this.getAssetsForExport();

        await results.forEachAsync(async (assetMetadata) => {
            return new Promise<void>(async (resolve) => {
                // Write Image
                const blob = await HtmlFileReader.getAssetBlob(assetMetadata.asset);
                const assetFilePath = `vott-csv-export/${assetMetadata.asset.name}`;
                const fileReader = new FileReader();
                fileReader.onload = async () => {
                    const buffer = Buffer.from(fileReader.result as ArrayBuffer);
                    await this.storageProvider.writeBinary(assetFilePath, buffer);
                    resolve();
                };
                fileReader.readAsArrayBuffer(blob);

                // Push CSV Records
                // The CSV file itself must have the following format::
                // image_id,xmin,ymin,xmax,ymax,label
                // image_1.jpg,26,594,86,617,cat
                // image_1.jpg,599,528,612,541,car
                // image_2.jpg,393,477,430,552,dog
                assetMetadata.regions.forEach((region) => {
                    region.tags.forEach((tag) => {
                        csvBuffer.push([
                            `"${assetMetadata.asset.name}"`,
                            Math.round(region.boundingBox.left).toString(),
                            Math.round(region.boundingBox.top).toString(),
                            Math.round(region.boundingBox.left + region.boundingBox.width).toString(),
                            Math.round(region.boundingBox.top + region.boundingBox.height).toString(),
                            tag.toString(),
                        ].join(","));
                    });
                });
            });
        });

        // Save CSV
        const fileName = `vott-csv-export/${this.project.name.replace(" ", "-")}-export.csv`;
        await this.storageProvider.writeText(fileName, csvBuffer.join("\n"));
    }
}
