import React, {useState, useEffect, useRef} from "react";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import {useForm, Controller} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message'


function Modal(props){
    const {onClose, content, mode, renderContent, requiredValue, isHidden} = props;

    const getRequiredStatus = (item) => {
        if (requiredValue[item.name] !== undefined) {
            return requiredValue[item.name];
        }

        return item.required;
    }

    const setHiddenCotent = (item) => {
        if (isHidden[item.name] !== undefined) {
            return isHidden[item.name];
        }

        return item.hidden;
    }

    // 모달 배경 스크롤 막기
    useEffect(() => {
        document.body.style.cssText = `
            position: fixed; 
            top: -${window.scrollY}px;
            overflow-y: scroll;
            width: 100%;`;
        return () => {
            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        };
    }, []);


    // 저장버튼 클릭
    const {register, handleSubmit, setValue, control, setError, formState:{errors}, trigger} = useForm();
    const onSubmit = (data) => {
        const formattedData = { ...data };
        content.forEach((item) => {
            if (item.element === "date") {
                const dateValue = dayjs(data[item.name]);
                if (!dateValue.isValid()) {
                  setError(item.name, { type: "manual", message: "유효한 날짜를 입력해주세요." });
                } else {
                  formattedData[item.name] = dateValue.format("YYYY-MM-DD HH:mm:ss");
                }
              }
        });
        props.saveData(formattedData);
    }
    

    // 삭제버튼 클릭
    const deleteData = () => {
        if(window.confirm("삭제하시겠습니까?")){
            props.deleteData();
        }
    }


    // inputBox value 값 변경 핸들러
    const [inputValue, setInputValue] = useState({});
    const handleChange = (e, type) => {
        const {name, value} = e.target;
        
        if( type === 'number' ) {
            // 숫자와 콤마만 남기고 제거
            const numbersOnly = value.replace(/[^0-9]/g, '');
            // 3자리마다 콤마를 추가
            const formattedNumber = numbersOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            
            setValue(name, formattedNumber); // react-hook-form 상태 업데이트
            setInputValue((preValues)=>({
                ...preValues,
                [name] : formattedNumber
            }));
        } else {
            setValue(name, value); // react-hook-form 상태 업데이트
            setInputValue((preValues)=>({
                ...preValues,
                [name] : value
            }));
        }
        
    };


    // selectBox 값 변경 핸들러
    const [selectedValue, setSelectedValue] = useState('');
    const handleSelectChange = (e, item) => {
        const {name, value} = e.target;
        setValue(name, value); // react-hook-form 상태 업데이트
        setSelectedValue((preValues)=>({
            ...preValues,
            [name] : value
        }));

        if( item.type=='customize' )
        {
            renderContent({ ...selectedValue, [name]: value });
        }
    };


    useEffect(() => {
        content.forEach((obj) => {
            let value = obj.value || '';
            if (obj.element === 'input' && obj.type === 'number') {
                value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }

            setValue(obj.name, value); // react-hook-form 상태 업데이트
            setInputValue((prev) => ({ ...prev, [obj.name]: value }));
            setSelectedValue((prev) => ({ ...prev, [obj.name]: value }));
        });

        trigger("recordType");

    }, [mode, content, setValue, trigger]);

      

    return (
        <div className="modal">
            <div className="modal_popup">
                <div style={{width:"100%",height:"10%"}}>
                    <button className="transper btn" style={{fontSize:"20px"}} onClick={()=>onClose(false)}>X</button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} style={{width:"100%",height:"90%"}}>
                    <div style={{width:"100%",height:"90%",overflowY:"auto"}}>
                        {content.map((item) => (
                             <div>
                                {(() => {
                                    switch (item.element) {
                                        case "input":
                                            return <div style={{display:"-webkit-inline-box", width:"100%"}}>
                                                        <div style={{width:"30%"}}>{item.label}</div>
                                                        <div style={{width:"70%"}}>
                                                            <input 
                                                                name={item.name} 
                                                                value={inputValue[item.name]}
                                                                // defaultValue={item.value}
                                                                maxLength={item.maxLength}
                                                                {...register(item.name,
                                                                    { required: { value: getRequiredStatus(item), message: "입력해주세요." } })}
                                                                onChange={(e) => handleChange(e, item.type)}
                                                            />
                                                            <ErrorMessage
                                                                errors={errors}
                                                                name={item.name}
                                                                render={({ message }) => <p style={{color:"red", fontSize:"10px", margin:"0"}}>{message}</p>}
                                                            />
                                                        </div>
                                                    </div>
                                        case "select":
                                            return (
                                                <div style={{display:"-webkit-inline-box", width:"100%"}} key={item.name} ref={(el) => {

                                                    if (el) {
                                                        el.style.display = setHiddenCotent(item) ? 'none' : '-webkit-inline-box';
                                                    }

                                                }}>
                                                    <div style={{width:"30%"}}>{item.label}</div>
                                                    <div style={{width:"70%"}}>
                                                    <Controller
                                                            name={item.name}
                                                            control={control}
                                                            rules={{ required: getRequiredStatus(item) ? "선택해주세요." : false }}
                                                            render={({ field }) => (
                                                                <select
                                                                    {...field}
                                                                    value={selectedValue[item.name]}
                                                                    onChange={(e) => {
                                                                        field.onChange(e); // react-hook-form 내부 상태 업데이트
                                                                        handleSelectChange(e, item); // 사용자 정의 핸들러
                                                                    }}
                                                                >
                                                                    {item.option.map((opt) => (
                                                                        <option key={opt.code_id} value={opt.code_id}>{opt.code_name}</option>
                                                                    ))}
                                                                </select>
                                                            )}
                                                        />
                                                        <ErrorMessage
                                                            errors={errors}
                                                            name={item.name}
                                                            render={({ message }) => <p style={{ color: "red", fontSize: "10px", margin: "0" }}>{message}</p>}
                                                        />
                                                    </div>
                                                </div>
                                                );
                                        case "date":
                                            return (
                                                <div style={{display:"-webkit-inline-box", width:"100%"}}>
                                                    <div style={{width:"30%"}}>{item.label}</div>
                                                    <div style={{width:"70%"}}>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <Controller
                                                                name={item.name}
                                                                control={control}
                                                                defaultValue={dayjs(item.value)}
                                                                rules={{
                                                                validate: (value) => {
                                                                    // value가 dayjs 객체가 아닐 경우 dayjs로 변환
                                                                    const date = dayjs(value);
                                                                    return (date.isValid() && value !== null) || "유효한 날짜를 입력해주세요.";
                                                                }
                                                                }}
                                                                render={({ field }) => (
                                                                <div>
                                                                    <DateTimePicker
                                                                        {...field}
                                                                        value={field.value ? dayjs(field.value) : null}
                                                                        format="YYYY-MM-DD HH:mm:ss"
                                                                        onChange={(date) => field.onChange(date ? dayjs(date) : null)}
                                                                        renderInput={(params) => <input {...params} />}
                                                                    />
                                                                    <ErrorMessage
                                                                        errors={errors}
                                                                        name={item.name}
                                                                        render={({ message }) => <p style={{ color: "red", fontSize: "10px", margin: "0" }}>{message}</p>}
                                                                    />
                                                                </div>
                                                                )}
                                                            />
                                                        </LocalizationProvider>
                                                    </div>
                                                </div>
                                            );    
                                        default:
                                            return null;
                                    }
                                })()}
                            </div>
                        ))}
                    </div>
                    <div style={{width:"100%",height:"10%"}}>
                        {
                            mode == 'REG'
                            ? <button type="submit" className="w-btn w-btn-green2" style={{width:"100%",bottom:"0"}}>저장</button>
                            : <div style={{display:"flex"}}>
                                <div onClick={deleteData} className="w-btn deleteBtn" style={{border:"solid 1px"}}></div>
                                <button type="submit" className="w-btn w-btn-green2" style={{width:"100%",bottom:"0"}}>저장</button>
                              </div>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Modal;