export default function(num){
    num = Math.round((num /10000) * 100) / 100;
    num = num + "万";
    return num;
}