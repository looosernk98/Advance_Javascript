const filters = {
    location:[
        {
            key: 'mumbai',
            doc_count: 122,
            selected: false
        },
        {
            key: 'Delhi',
            doc_count: 124,
            selected: false
        },
        {
            key: 'Rajasthan',
            doc_count: 125,
            selected: false
        }
    ],
    gender:[
        {
            key: 'Male',
            doc_count: 122,
            selected: false
        },
        {
            key: 'Female',
            doc_count: 122,
            selected: false
        },
        {
            key: 'Transgender',
            doc_count: 122,
            selected: false
        }
    ],
    company:[
        {
            key: 'Google',
            doc_count: 122,
            selected: false
        },
        {
            key: 'Microsoft',
            doc_count: 122,
            selected: false
        },
        {
            key: 'Amazon',
            doc_count: 122,
            selected: false
        }
    ],
    notice_period: [
        {
            key: 'Immediate',
            doc_count: 122,
            selected: false
        },
        {
            key: '30 days',
            doc_count: 122,
            selected: false
        },
        {
            key: '60 days',
            doc_count: 122,
            selected: false
        }
    ],
    mercurial_recommendation:[
        {
            key: 'Recommended',
            doc_count: 122,
            selected: false
        },
        {
            key: 'Need More Info',
            doc_count: 122,
            selected: false
        },
        {
            key: 'Not Recommended',
            doc_count: 122,
            selected: false,
            not_recommended_reasons:[
                {
                    key: 'High CTC',
                    doc_count: 122,
                    selected: false,
                },
                {
                    key: 'Location Mismatch',
                    doc_count: 122,
                    selected: false,
                },
                {
                    key: 'CTC Mismatch',
                    doc_count: 122,
                    selected: false,
                },
            ]
        }
    ]
}

const filter_values = {
    location: ["delhi", "mumbai", "bangalore"],
    gender: ["male", "female", "others"],
    company: ["google", "Microsoft"],
    notice_period :["Immediate", "30 days", "60 days"],
    mercurial_recommendation:["Recommended", "Not Recommended", "Need More Info"],
    not_recommended_reasons: ["High CTC", "High Notice Period", "CTC Mismatch"]
}

const extractAllFilterWithValues = (data) => {
    let extractedValues = {}
    for (const [key, value] of Object.entries(data)) {
        extractedValues[key] = value.map(item =>{
            const childKey = Object.keys(item).filter(_key=> Array.isArray(item[_key]))[0];
            if(childKey){
                const childValues = extractAllFilterWithValues({[childKey]: item[childKey]});
                // extractedValues = { ...extractedValues, ...childValues}
                extractedValues[childKey] = childValues[childKey]
            }
            return item.key
        })
    }
    return  extractedValues;
}

const ans = extractAllFilterWithValues(filters);
// console.log('ans: ', ans);

const mapChildToGrandParent = (filters) => {
    const map = new Map();
    Object.keys(filters)?.forEach((grandKey) => {
        filters[grandKey]?.forEach((parObj) => {
            Object.keys(parObj)?.forEach((childKey) => {
               if(Array.isArray(parObj[childKey])){
                 map.set(childKey, grandKey)
               }
            })
        })
    })
  return map;
}

const mapParentToChild = (filters) => {
    const map = new Map();
    Object.keys(filters)?.forEach((grandKey) => {
        filters[grandKey]?.forEach((parObj) => {
            Object.keys(parObj)?.forEach((childKey) => {
               if(Array.isArray(parObj[childKey])){
                 map.set(parObj?.key, childKey)
               }
            })
        })
    })
    return map;
}
const mappings = mapChildToGrandParent(filters)
console.log('mappings: ', mappings);

const mappings2 = mapParentToChild(filters)
console.log('mappings2: ', mappings2);