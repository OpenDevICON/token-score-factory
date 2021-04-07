function padLeadingZeros(num, size) {
    var s = num;
    while(s.length  < size) {
      s = '0' + s;
    }
    return s;
  }

export const fetchScoreByteCode = (url) => {
    fetch(url)
    .then(async (response) => {
      let arrayBuffer = await response.arrayBuffer();
      let byteArray = new Uint8Array(arrayBuffer);
      let contentInHex = "";
      for (var i = 0; i < byteArray.length; ++i) {
        const byteInHex = padLeadingZeros(byteArray[i].toString('16'), 2);
        contentInHex = contentInHex + byteInHex;
      }
      console.log(contentInHex);
    })
    .catch(err => {
      console.error(err);
    });
}