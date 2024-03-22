var temp = [[20,44],
    [-2,20],
    [12,28],
    [10,32],
    ]

    // function Gcd(a: number, b: number):number{
    //     if(a===0){
    //         return b;
    //     }else{
    //         return Gcd(b%a, a)
    //     }
    // }
    temp.sort((a, b)=> a[0]*b[1]- a[1]*b[0]);

    console.log(temp)

    // console.log(Gcd(-2, 20))