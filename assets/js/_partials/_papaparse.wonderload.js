function parseWonderDataFile(data) {
  let parsedData = data.slice(0).reduce((acc, obj) => {
    if (obj[0] !== "Total") return acc

    const xValue = parseInt(obj[2])
    const yValue = parseFloat(obj[5] / obj[6]).toPrecision(2)
    const datapoint = {x: xValue, y: yValue}

    if (Number.isInteger(xValue) && !isNaN(yValue)) {
      acc.push(datapoint)
      // console.log(datapoint)
    }
    return acc
  }, [])
  return parsedData
}

function loadData(source) {
  return new Promise((resolve, reject) => {
    Papa.parse(source, {
      header: true,
      download: true,
      complete(results) {
        resolve(results.data)
      },
      error(err) {
        reject(err)
      }
    })
  })
}

// EXAMPLE:

async function main() {
  try {
    const d1 = await loadData("/assets/data/usa/wonder/UCD-by-Age-2000.txt")
    // console.log(d1)
    const usaUCD2000Data = parseWonderDataFile(d1)

    const d2 = await loadData("/assets/data/usa/wonder/UCD-by-Age-2018.txt")
    // console.log(d2)
    const usaUCD2018Data = parseWonderDataFile(d2)

  }
  catch(e) {}
  finally {}
}

main()