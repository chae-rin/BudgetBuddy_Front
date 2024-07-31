import React, {useEffect, useState} from "react";
import axios from "axios";

function Main(props){
    const [budgetList, setBudgetList] = useState([]);

    const getBudgetList = async() => {
        axios({
            method: 'post',
            url: '/budget/list',
            params: {
                userId: 'hue9404',
                recordDt : props.curDate.getFullYear() + '-' + ("00"+(props.curDate.getMonth()+1).toString()).slice(-2)
            }
        })
        .then((res) => {
            let data = res.data.data;
            setBudgetList(data);
            
            console.log(budgetList.length);
        })
        .catch((err) => {
            console.error(err);
        });
    }

    useEffect(() => {
        getBudgetList();
      }, [props.curDate]);      

    return (
        <div className="Main">
            <div className="list-header">
                <span style={{fontWeight:"bold"}}>전체내역</span>
                {/* <button className="w-btn w-btn-green">추가</button> */}
            </div>
            <div className="budget-list">
                <ul>
                    { budgetList.length==0 ? 
                    <li style={{width:"100%", display:"inline-block", textAlign:"center"}}>지출 / 수입 내역이 없습니다.</li>
                    : budgetList.map((budget) => (
                    <li key={budget.record_id}>{budget.record_detail}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Main;