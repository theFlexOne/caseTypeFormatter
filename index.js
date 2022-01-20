const CASE_TYPES = {
  CAMEL: new RegExp('^_{0,2}[a-z][a-zA-Z0-9]*$'),
  PASCAL: new RegExp('^_{0,2}[A-Z][a-zA-Z0-9]*$'),
  KEBAB: new RegExp('^_{0,2}[a-z]+(-[a-z0-9]+)*$'),
  SNAKE: new RegExp('^_{0,2}[a-z]+(_[a-z0-9]+)*$'),
  TITLE: new RegExp('^[A-Z][a-z]*( [A-Z][a-z]*)*$'),
  CONSTANT: new RegExp('^_{0,2}[A-Z][A-Z_]*[^_]$'),
};

// const OTHER_TYPES = {
//   HAS_SPACES: new RegExp('^[]')
// }

const CASE_TYPE_DESCRIPTOR = {
  writable: false,
  configurable: false,
  enumerable: true,
};

class CaseTypes {
  constructor() {
    for (const caseType in CASE_TYPES) {
      const key = caseType.toLowerCase();
      const value = CASE_TYPES[caseType];
      Object.defineProperty(this, key, { value, ...CASE_TYPE_DESCRIPTOR });
    }
  }
  get types() {
    return Object.keys(this);
  }
  toCamelCase(str) {
    const [type, ...otherTypes] = this.getTypesFor(str);
    if (otherTypes.includes('camel')) return str;
    // console.log(`type: `, type);
    // otherTypes[0] && console.log(otherTypes);
    switch (type) {
      case 'oneWord': {
        return str.toLowerCase();
      }
      // case 'pascal': {
      //   const newString = str[0].toUpperCase() + str.slice(1);
      //   return newString;
      // }
      case 'snake':
      case 'kebab': {
        const splitString = str.split(/[_-]/);
        const newString = splitString
          .map((word, i) => {
            return i > 0 ? word[0].toUpperCase() + word.slice(1) : word;
          })
          .join('');
        console.log(`splitString: `, splitString);
        return newString;
      }
    }
    // TODO - still working on it...
  }
  getTypesFor(str) {
    const oneWordRegex = new RegExp('^[a-zA-Z]+(?![A-Z_])$');
    const caseTypes = [];
    if (oneWordRegex.test(str)) {
      caseTypes.push('oneWord');
    }
    for (const type in this) {
      if (this[type].test(str)) {
        caseTypes.push(type);
      }
    }
    return caseTypes[0] ? caseTypes : ['invalid'];
  }
  addNewType(key, value) {
    this[key] = new RegExp(value);
  }
}

const caseTypes = new CaseTypes();

// const VALID_REGEX = new RegExp('\\/.+(\\/[a-zA-Z])*');
