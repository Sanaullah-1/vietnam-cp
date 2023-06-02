export const languages = [
    { name: 'English', value: 'en-gb' },
    { name: 'عربى', value: 'ar-ae' },
    { name: 'Japnese', value: 'jp' },
    { name: 'Russian', value: 'ru' },
    { name: 'Spanish', value: 'es' },
    { name: 'Farsi', value: 'fa' },
    { name: 'Chinese', value: 'zh' },
    { name: 'Sorani', value: 'so' },
  ];
  export const getCustomerType = (value = 0) => {
    let rightsNum = value;
    const output = {
      isClient: false,
      isIb: false,
      isJoint: false,
      isCorporate: false,
      isCorporateIb: false
    };
    
    if (rightsNum === 0) return output;
    if (rightsNum > 0 && Math.floor(rightsNum / 16) >= 1)
      output.isCorporateIb = true;
    rightsNum %= 16;
    if (rightsNum > 0 && Math.floor(rightsNum / 8) >= 1)
      output.isCorporate = true;
    rightsNum %= 8;
    if (rightsNum > 0 && Math.floor(rightsNum / 4) >= 1) output.isJoint = true;
    rightsNum %= 4;
    if (rightsNum > 0 && Math.floor(rightsNum / 2) >= 1) output.isIb = true;
    rightsNum %= 2;
    if (rightsNum > 0 && Math.floor(rightsNum / 1) >= 1) output.isClient = true;
    return output;
  };

  export const formatNumber = (number, fixDecimal = false, decimalSize = 2) => {
    if (isNaN(number)) return fixDecimal ? '--.--' : '--';
    let num = number;
    if (fixDecimal) {
      num = parseFloat(num);
      num = num.toFixed(decimalSize);
    }
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };