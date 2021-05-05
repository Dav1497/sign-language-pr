export function getModelDict(mid) {
    let classesDir ={};
    console.log(mid);
    if(mid < 3){
        classesDir = {
            1: {
                name: 'A',
                id: 1,
            },
            2: {
                name: 'B',
                id: 2,
            },
            3: {
                name: 'C',
                id: 3
            }
        }
        console.log(classesDir);
        return classesDir;
    }
    else{
        switch (mid) {
            case 3:
                classesDir = {
                    1: {
                        name: 'Rojo',
                        id: 1,
                    },
                    2: {
                        name: 'Diciembre',
                        id: 2,
                    }
                }
                console.log(classesDir);
                return classesDir;
            case 4:
                classesDir = {
                    1: {
                        name: 'Agosto',
                        id: 1,
                    }
                }
                console.log(classesDir);
                return classesDir;
            case 5:
                classesDir = {
                    1: {
                        name: 'Rojo',
                        id: 1,
                    },
                    2: {
                        name: 'Diciembre',
                        id: 2,
                    }
                }
                console.log(classesDir);
                return classesDir;
        }
    }
}