import React, {useEffect, useState, Link, useRef} from "react";
import axios from "axios";

import Modal from '../../pages/Modal.js';

function Main(props){

    const uri = '/budget/' + props.curDate.getFullYear() + '/' +  (props.curDate.getMonth()+1)
                
    // 전체내역 가져오기
    const [budgetList, setBudgetList] = useState([]);
    const getBudgetList = async() => {
        axios({
            method: 'get',
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
    
    
    // 카테고리 리스트 가져오기
    const [categoryList, setCategoryList] = useState([]);
    const getCategoryList = async()=>axios({
        method: 'get',
        url: '/common/code',
        params: {
            grpCodeId: 'EXPEND-CTGR'
        }
    })
    .then((res) => {
        let data = res.data.data;
        setCategoryList([{code_id:"", code_name:"선택하세요"}, ...data]);
    })
    .catch((err) => {
        console.error(err);
    });
    
    useEffect(() => {
        getCategoryList();
      },[]);
    
    
    // 모달
    const [modal, setModal] = useState(false);
    const [mode, setMode] = useState('REG');
    const [data, setData] = useState([]);
    
    const recordId = useRef(''); 
    const budgetInfo = useRef({});

    const getData = async(param)=>{
        
        // 아이디 세팅
        // setRecordId(param);
        recordId.current = param;

        if(recordId.current !== '')
        {
            await axios({
                method: 'get',
                url: '/budget/info',
                params: {
                    recordId  : recordId.current,
                    userId    : 'hue9404'
                }
            })
            .then((res) => {
                let data = res.data.data;
                budgetInfo.current = data;
            })
            .catch((err) => {
                console.error(err);
            });
        }


        // 데이터 세팅 
        setData([
            {
                label : "금액",
                name : "recordAmount",
                element : "input",
                value : (recordId.current=='') ? "" : budgetInfo.current.record_amount,
                required : true,
                maxLength : 100,
                type : "number"
            },
            {
                label : "분류",
                name : "recordType",
                element : "select",
                option : [{code_id:"0", code_name:"지출"},{code_id:"1", code_name:"수입"}],
                value : (recordId.current=='') ? "0" : budgetInfo.current.record_type,
                required : true,
                type : "customize"
            },
            {
                label : "카테고리",
                name : "expendCategory",
                element : "select",
                option : categoryList,
                value : (recordId.current=='') ? "" : (budgetInfo.current.record_type=='0') ? budgetInfo.current.record_cd : "",
                required : (recordId.current=='') ? true : (budgetInfo.current.record_type=='0') ? true : false,
                hidden : (recordId.current=='') ? false : (budgetInfo.current.record_type=='0') ? false : true
            },
            {
                label : "카테고리",
                name : "incomeCategory",
                element : "select",
                option : [{code_id:"", code_name:"선택하세요"},{code_id:"CTGR016", code_name:"월급"},{code_id:"CTGR017", code_name:"상여금"}],
                value : (recordId.current=='') ? "" : (budgetInfo.current.record_type=='1') ? budgetInfo.current.record_cd : "",
                required : (recordId.current=='') ? false : (budgetInfo.current.record_type=='1') ? true : false,
                hidden : (recordId.current=='') ? true : (budgetInfo.current.record_type=='1') ? false : true 
            },
            {
                label : "거래처",
                name : "recordDetail",
                element : "input",
                value : (recordId.current=='') ? "" : budgetInfo.current.record_detail,
                required : true,
                maxLength : 500
            },
            {
                label : "결제수단",
                name : "recordPayment",
                element : "select",
                option : [{code_id:"", code_name:"선택하세요"},{code_id:"0", code_name:"현금"},{code_id:"1", code_name:"카드"}],
                value : (recordId.current=='') ? "" : (budgetInfo.current.record_type=='0') ? budgetInfo.current.record_out_payment_cd : "",
                required : (recordId.current=='') ? true : (budgetInfo.current.record_type=='0') ? true : false,
                hidden : (recordId.current=='') ? false : (budgetInfo.current.record_type=='0') ? false : true 
            },
            {
                label : "날짜",
                name : "recordDtm",
                element : "date",
                value : (recordId.current=='') ? new Date().toISOString() : budgetInfo.current.record_dtm,
                required : true
            },
            {
                label : "메모 (선택항목)",
                name : "recordMemo",
                element : "input",
                value : (recordId.current=='') ? "" : budgetInfo.current.record_memo,
                required : false,
                maxLength : 500
            }
        ]);
    }


    const [requiredValue, setRequiredValue] = useState({});
    const [isHidden, setHidden] = useState({});

    const renderContent = (selectedValue) => {
        const expends = document.getElementsByName("expendCategory");
        const income = document.getElementsByName("incomeCategory");
        const payment = document.getElementsByName("recordPayment");

        if( selectedValue.recordType === '0' )
        {
            // expends.forEach(target => { target.parentElement.parentElement.style.display = '-webkit-inline-box'; });
            // income.forEach(target => {  target.parentElement.parentElement.style.display = 'none'; });
            // payment.forEach(target => {  target.parentElement.parentElement.style.display = '-webkit-inline-box'; });

            setRequiredValue(prevValues => ({
                ...prevValues,
                expendCategory: true,
                incomeCategory: false,
                recordPayment: true
            }));

            setHidden(prevValues => ({
                ...prevValues,
                expendCategory: false,
                incomeCategory: true,
                recordPayment: false
            }));
        }
        else
        {
            // expends.forEach(target => { target.parentElement.parentElement.style.display = 'none'; });
            // income.forEach(target => {  target.parentElement.parentElement.style.display = '-webkit-inline-box'; });
            // payment.forEach(target => {  target.parentElement.parentElement.style.display = 'none'; });

            setRequiredValue(prevValues => ({
                ...prevValues,
                expendCategory: false,
                incomeCategory: true,
                recordPayment: false
            }));

            setHidden(prevValues => ({
                ...prevValues,
                expendCategory: true,
                incomeCategory: false,
                recordPayment: true
            }));
        }
        
    };




    // 데이터 저장
    const saveData = (params) => {
        if(mode==='REG'){
            insertData(params);
        } else{
            // updateData(params);
        }
    }


    function insertData(params) {
        axios({
            method: 'post',
            url: '/budget',
            params: {
                userId          : 'hue9404',
                recordAmount    : params.recordAmount.replace(/,/gi, ''),
                recordType      : params.recordType,
                expendCategory  : params.expendCategory,
                incomeCategory  : params.incomeCategory,
                recordDetail    : params.recordDetail,
                recordPayment   : params.recordPayment,
                recordDtm       : params.recordDtm,
                recordMemo      : params.recordMemo
            }
        })
        .then((res) => {
            let data = res.data.data;
            
            if( data === 'SUCCESS')
            {
                setModal(false);
                window.location.replace( uri );
            }
        })
        .catch((err) => {
            console.error(err);
        });
    }


    function updateData(params){
        axios({
            method: 'put',
            url: '/budget/' + recordId.current,
            params: {
                recordId        : recordId.current,
                userId          : 'hue9404',
                recordAmount    : params.recordAmount.replace(/,/gi, ''),
                recordType      : params.recordType,
                expendCategory  : params.expendCategory,
                incomeCategory  : params.incomeCategory,
                recordDetail    : params.recordDetail,
                recordPayment   : params.recordPayment,
                recordDtm       : params.recordDtm,
                recordMemo      : params.recordMemo
            }
        })
        .then((res) => {
            let data = res.data.data;

            if( data === 'SUCCESS')
            {
                setModal(false);
                window.location.replace( uri );
            }
            
        })
        .catch((err) => {
            console.error(err);
        });
    }


    // 데이터 삭제
    const deleteData = ()=>{

        axios({
            method: 'put',
            url: '/budget/' + recordId.current,
            params: {
                recordId  : recordId.current,
                userId    : 'hue9404'
            }
        })
        .then((res) => {
            let data = res.data.data;

            if( data === 'SUCCESS')
            {
                setModal(false);
                window.location.replace( uri );
            }
            
        })
        .catch((err) => {
            console.error(err);
        });
    }

    return (
        <div className="Main">
            <div className="list-header">
                <span style={{fontWeight:"bold"}}>전체내역</span>
                <button className="transper btn" onClick={()=>{setModal(true); setMode('REG'); getData('');}}>+</button>
                {
                    modal === true ? 
                    <Modal onClose={setModal} 
                           content={data}
                           saveData={saveData}
                           mode={mode}
                           deleteData={deleteData}
                           renderContent={renderContent}
                           requiredValue={requiredValue}
                           isHidden={isHidden}>
                    </Modal> 
                    : null
                }
            </div>
            <div className="budget-list">
                <ul>
                    { Object.keys(budgetList).length===0 ? 
                    <li style={{width:"100%", display:"inline-block", textAlign:"center"}}>지출 / 수입 내역이 없습니다.</li>
                    : Object.entries(budgetList).map((item, idx) => {
                        return(
                        <li key={idx}>{item[0]}
                            <dt>
                                {item[1].map((budget) => (
                                    <dl key={budget.record_id}>
                                        <div className={"category " + budget.record_cd}>{budget.code_name}</div>
                                        <div className="detail" onClick={()=>{setModal(true); setMode('UPD'); getData(budget.record_id);}}>{budget.record_detail}</div>
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