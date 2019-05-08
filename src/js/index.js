const baseUrl=require('../../baseUrl/index');
console.log(baseUrl.junziqian);
const a=1;
console.log(a);
console.log('********************',process.env)
class Person {
    constructor(name,age){
        this.name=name;
        this.age=age;
    };
    fn1(){
        console.log(this.name,this.age)
    }
}
let p=new Person('张三',25);
p.fn1();

class per extends Person{
    constructor(name,age,sex){
        super(name,age);
        this.sex=sex;
    }
    fn2(){
        console.log(this.sex)
    }
}
let p2=new per('李四',30,'男');
p2.fn1();
p2.fn2();
// setInterval(()=>{
//     console.log(1111);
// },1000)

let arr=[1,2,3]
arr.forEach(i=>console.log(i))