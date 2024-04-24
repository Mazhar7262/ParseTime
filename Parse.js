function parseTime(timeString) {

    const now = new Date();

    const [modifier, snap] = timeString.split('@');
    const modifierRegex = /[+-]?\d+[smhdwy]?/g;
    const modifiers = modifier.match(modifierRegex);
    let result = new Date(now);
    if(modifiers != null)
    {
            modifiers.forEach(mod => {
                const operator = mod[0];
                const value = parseInt(mod.slice(1, -1));
                const unit = mod.slice(-1);

                switch (unit) {
                    case 's':
                        result.setSeconds(result.getSeconds() + (operator === '+' ? value : -value));
                        break;
                    case 'm':
                        result.setMinutes(result.getMinutes() + (operator === '+' ? value : -value));
                        break;
                    case 'h':
                        result.setHours(result.getHours() + (operator === '+' ? value : -value));
                        break;
                    case 'd':
                        result.setDate(result.getDate() + (operator === '+' ? value : -value));
                        break;
                    case 'w':
                        result.setDate(result.getDate() + (operator === '+' ? value * 7 : -value * 7));
                        break;
                    case 'y':
                        result.setFullYear(result.getFullYear() + (operator === '+' ? value : -value));
                        break;
                    default:
                        throw new Error('Invalid time unit');
                }
            }); 
    }
     
    if (snap) {
        switch (snap) {
            case 's':
                result.setMilliseconds(0);
                break;
            case 'm':
                result.setSeconds(0, 0);
                break;
            case 'h':
                result.setMinutes(0, 0, 0);
                break;
            case 'd':
                result.setHours(0, 0, 0, 0);
                break;
            case 'w':
                result.setDate(result.getDate() - result.getDay());
                result.setHours(0, 0, 0, 0);
                break;
            case 'mon':
                result.setDate(1);
                result.setHours(0, 0, 0, 0);
                break;
            case 'y':
                result.setMonth(0, 1);
                result.setHours(0, 0, 0, 0);
                break;
            default:
                throw new Error('Invalid snap unit');
        }
    }
    return result.toISOString();
}

// Example:
console.log(parseTime('now()+1d')); // Output will be current time + 1 day
console.log(parseTime('now()-1d')); // Output will be current time - 1 day
console.log(parseTime('now()@d')); // Output will be the start of the current day
console.log(parseTime('now()-1y@mon')); // Output will be the start of the month one year ago
console.log(parseTime('now()+10d+12h')); // Output will be current time + 10 days and 12 hours
