const isObject = obj => {
    return typeof obj === "object" && obj !== null && !Array.isArray(obj);
  };
  
  const isPrimitive = value => {
    return !Array.isArray(value) && !isObject(value);
  };
  
  const clone = obj => {
    if (isPrimitive(obj)) {
      return obj;
    }
  
    const result = Array.isArray(obj) ? [] : {};
  
    Object.keys(obj).forEach(key => {
      result[key] = clone(obj[key]);
    });
  
    return result;
  };
  
  const overlay = (bottom, top) => {
    if (bottom == null && top != null) {
      return clone(top);
    }
  
    if (top == null && bottom != null) {
      return clone(bottom);
    }
  
    const result = clone(top);
  
    if (isPrimitive(bottom)) {
      if (typeof bottom === typeof top) {
        return top;
      } else {
        return bottom;
      }
    }
  
    Object.keys(bottom).forEach(key => {
      if (Array.isArray(bottom[key])) {
        if (Array.isArray(top[key])) {
          result[key] = overlay(bottom[key], top[key]);
        } else {
          result[key] = clone(bottom[key]);
        }
      } else if (isObject(bottom[key])) {
        if (isObject(top[key])) {
          result[key] = overlay(bottom[key], top[key]);
        } else {
          result[key] = clone(bottom[key]);
        }
      } else if (isPrimitive(bottom[key])) {
        if (typeof bottom[key] === typeof top[key]) {
          result[key] = overlay(bottom[key], top[key]);
        } else {
          result[key] = clone(bottom[key]);
        }
      }
    });
  
    return result;
  };
  
  export default overlay;
  