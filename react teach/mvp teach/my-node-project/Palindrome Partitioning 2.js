/**
 * @param {string} s
 * @return {string[][]}
 */

// не смог решит
// var partition = function(s) {
//     //в теории надо идти половину строки 

//     function isPolindrim(s) {
//         if (s.length==1){return true}
//         const len_half=Math.floor(s.length/2)
//         const len_s=s.length
//         for (let i = 0; i < len_half; i++) {
//             // const element = array[i];
//             if(s[i]!=s[len_s-i]){
//                 return false
//             }
//         }
//         return true
//     }

//     let arr=[[]]
//     const len_global=s.length-1
//     // let start=0
//     const len_half=Math.floor(s.length/2)
//     function subPartition(start,s) {
//         const answer=[]
//         for (let i = 0; i <len_mid ; i++) {
//             if (isPolindrim(start+1,s.substring(start,i+1))){

//             }
//             // const element = s[i];
                    
//         }
//     }
//     subPartition(0,s)
// };


var partition = function(s) {
    function isPolindrom(s) {
        if (s.length==1) {
            return true
        }
        let left =0
        let right=s.length-1
        while (left<right){
            if (s[left]!=s[right]){
                return false
            }
            left++
            right--
        }
        return true
    }
//    let answer=[]
   const n=s.length
   let res=[]
   function partitionPolindrom(currId,currArr) {
        const isLastPolindrom=isPolindrom(currArr[currArr.length-1])
        if (currId==n) {
            if (isLastPolindrom){
                res.push([...currArr])
            }
            return 
        }
        if (isLastPolindrom){
            currArr.push(s[currId])
            // partitionPolindrom(currId+1,[...currArr,s[currId]])
            partitionPolindrom(currId+1,currArr)
            currArr.pop()
        }
        currArr[currArr.length-1]+=s[currId]
        partitionPolindrom(currId+1,currArr)
        // currArr[currArr.length-1]=currArr[currArr.length-1].slice(0,-1)
        return
   }
   partitionPolindrom(1,[s[0]])

//    let a32=23
   return res
};

// let s="aab"
// let aaa= partition(s)

// // let afasf=isPolindrom('abaa')
// let ab=32323
