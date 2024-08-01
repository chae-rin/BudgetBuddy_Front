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
                <button>+</button>
            </div>
            <div className="budget-list">
                <ul>
                    { Object.keys(budgetList).length===0 ? 
                    <li style={{width:"100%", display:"inline-block", textAlign:"center"}}>지출 / 수입 내역이 없습니다.</li>
                    : Object.entries(budgetList).map((item, idx) => {
                        console.log( item[0] );
                       
                       return(
                        <li key={idx}>{item[0]}
                            <dt>
                                {item[1].map((budget) => (
                                    <dl key={budget.record_id}>
                                        <div className="category">카테고리</div>
                                        <div className="detail">{budget.record_detail}</div>
                                        <div className="amount"><span>{budget.record_type==0?'-':'+'}</span>{budget.record_amount.toLocaleString('ko-KR')}원</div>
                                    </dl>
                                ))}
                            </dt>
                        </li>
                       )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Main;