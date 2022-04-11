function buildCsvData(dataset) {
  let csvData = []
  dataset.forEach(set => {
    let data = set["data"]
    let label = set["label"]

    data.forEach(point => {
      if (!point) return
      let line = {}
      line["label"] = label
      line["x_age"] = point.x
      line["y_value"] = point.y
      csvData.push(line)
    })
  })
  return csvData
}

function setDownloadLink(linkEl, blobUrl, fileName) {
  linkEl.type = 'text/csv'
  linkEl.download = fileName || 'chart-data.csv'
  linkEl.href = blobUrl
}

function createBlob(data) {
  // https://github.com/mholt/PapaParse/issues/175#issuecomment-395978144
  if (!data) return

  // https://stackoverflow.com/questions/7076042/what-mime-type-should-i-use-for-csv
  const mimetype = 'text/csv'

  const blob = data.constructor !== Blob
    ? new Blob([data], {type: mimetype})
    : data

  const url = window.URL
  return url.createObjectURL(blob)
}

function createCsv(dataset, linkId, fileName) {
  let csvData, blobUrl, linkEl
  csvData = buildCsvData(dataset.datasets)
  // https://www.papaparse.com/docs#json-to-csv
  blobUrl = createBlob(Papa.unparse(csvData))
  linkEl = document.getElementById(linkId)

  setDownloadLink(linkEl, blobUrl, fileName)
}

// USAGE EXAMPLE

// 1. papaparse: True
// 2. createCsv(makeham1867HazardFitDataset, 'link-makeham_1867-hazard-fit', 'makeham_1867-hazard-fit.csv')
// 3. <a id="link-makeham_1867-hazard-fit" download>Download .csv data</a>
