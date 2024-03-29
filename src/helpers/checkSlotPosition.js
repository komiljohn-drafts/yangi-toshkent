export const CheckSlotPosition = (slots, slot) => {

  let index = "";

  const type6 = [5, 3, 1, 6, 4, 2]
  const type12 = [11, 9, 7, 5, 3, 1, 12, 10, 8, 6, 4, 2]
  const type18 = [17, 15, 13, 11, 9, 7, 5, 3, 1, 18, 16, 14, 12, 10, 8, 6, 4, 2]
  const type30 = [29, 25, 21, 17, 13, 9, 5, 1, 30, 26, 22, 18, 14, 10, 6, 2, 27, 23, 19, 15, 11, 7, 3, 28, 24, 20, 16, 12, 8, 4]
  const type36 = [33, 29, 25, 21, 17, 13, 9, 5, 1, 34, 30, 26, 22, 18, 14, 10, 6, 2, 35, 31, 27, 23, 19, 15, 11, 7, 3, 36, 32, 28, 24, 20, 16, 12, 8, 4]

  if (slots == 24) {
    switch (slot?.toString()) {
      case "1":
        index = 23;
        break;
      case "2":
        index = 21;
        break;
      case "3":
        index = 19;
        break;
      case "4":
        index = 17;
        break;
      case "5":
        index = 15;
        break;
      case "6":
        index = 13;
        break;
      case "7":
        index = 11;
        break;
      case "8":
        index = 9;
        break;
      case "9":
        index = 7;
        break;
      case "10":
        index = 5;
        break;
      case "11":
        index = 3;
        break;
      case "12":
        index = 1;
        break;
      case "13":
        index = 24;
        break;
      case "14":
        index = 22;
        break;
      case "15":
        index = 20;
        break;
      case "16":
        index = 18;
        break;
      case "17":
        index = 16;
        break;
      case "18":
        index = 14;
        break;
      case "19":
        index = 12;
        break;
      case "20":
        index = 10;
        break;
      case "21":
        index = 8;
        break;
      case "22":
        index = 6;
        break;
      case "23":
        index = 4;
        break;
      case "24":
        index = 2;
        break;
      default:
        break;
    }
  } else if (slots == 48) {
    switch (slot?.toString()) {
      case "1":
        index = 45;
        break;
      case "2":
        index = 41;
        break;
      case "3":
        index = 37;
        break;
      case "4":
        index = 33;
        break;
      case "5":
        index = 29;
        break;
      case "6":
        index = 25;
        break;
      case "7":
        index = 21;
        break;
      case "8":
        index = 17;
        break;
      case "9":
        index = 13;
        break;
      case "10":
        index = 9;
        break;
      case "11":
        index = 5;
        break;
      case "12":
        index = 1;
        break;
      case "13":
        index = 46;
        break;
      case "14":
        index = 42;
        break;
      case "15":
        index = 38;
        break;
      case "16":
        index = 34;
        break;
      case "17":
        index = 30;
        break;
      case "18":
        index = 26;
        break;
      case "19":
        index = 22;
        break;
      case "20":
        index = 18;
        break;
      case "21":
        index = 14;
        break;
      case "22":
        index = 10;
        break;
      case "23":
        index = 6;
        break;
      case "24":
        index = 2;
        break;
      case "25":
        index = 47;
        break;
      case "26":
        index = 43;
        break;
      case "27":
        index = 39;
        break;
      case "28":
        index = 35;
        break;
      case "29":
        index = 31;
        break;
      case "30":
        index = 27;
        break;
      case "31":
        index = 23;
        break;
      case "32":
        index = 19;
        break;
      case "33":
        index = 15;
        break;
      case "34":
        index = 11;
        break;
      case "35":
        index = 7;
        break;
      case "36":
        index = 3;
        break;
      case "37":
        index = 48;
        break;
      case "38":
        index = 44;
        break;
      case "39":
        index = 40;
        break;
      case "40":
        index = 36;
        break;
      case "41":
        index = 32;
        break;
      case "42":
        index = 28;
        break;
      case "43":
        index = 24;
        break;
      case "44":
        index = 20;
        break;
      case "45":
        index = 16;
        break;
      case "46":
        index = 12;
        break;
      case "47":
        index = 8;
        break;
      case "48":
        index = 4;
        break;
      default:
        break;
    }
  } else if (slots%6 === 0) {
      switch (slots) {
        case 6:
          return type6[slot-1]
        case 12:
          return type12[slot-1]
        case 18:
          return type18[slot-1]
        case 30:
          return type30[slot-1]
        case 36:
          return type36[slot-1]
        default:
          break;
      }
  }

  return index;
};
