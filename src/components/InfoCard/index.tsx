import React from 'react'
import calories from '../../assets/calories.svg'
import proteins from '../../assets/proteins.svg'
import glucids from '../../assets/glucids.svg'
import lipids from '../../assets/lipids.svg'

interface InfoCardProps {
  dataType: string,
  value: number
}

const InfoCard: React.FC<InfoCardProps> = ({dataType, value}) => {
  return (
    <div className='flex justify-start items-center bg-[#FBFBFB] h-[124px] p-[32px] rounded-[5px]'>
      <div className={`relative flex justify-center items-center p-[22px] rounded-[6px] w-[60px] h-[60px] mr-[24px] bg-opacity-15 ${dataType === 'calorieCount' ? 'bg-calories' : dataType === 'proteinCount' ? 'bg-proteins' : dataType === 'carbohydrateCount' ? 'bg-glucids' : 'bg-lipids'}`}>
        {dataType === 'calorieCount' && <img src={calories} alt="icône calories représentée par une flamme" className='absolute w-[19px] h-[19px] m-[32px] z-[100]'/>}
        {dataType === 'proteinCount' && <img src={proteins} alt="icône proteines représentée par une cuisse de poulet" className='w-[19px] h-[19px]' />}
        {dataType === 'carbohydrateCount' && <img src={glucids} alt="icône glucides représentée par une pomme" className='w-[19px] h-[19px]' />}
        {dataType === 'lipidCount' && <img src={lipids} alt="icône lipides représentée par un burger" className='w-[19px] h-[19px]' />}
      </div>

      <div className='flex flex-col items-start text-[20px] font-bold'>
        <p className='text-secondary'>
          {value} {dataType === 'calorieCount' ? 'kCal' : dataType === 'proteinCount' ? 'g' : dataType === 'carbohydrateCount' ? 'g' : 'g'}
        </p>
        <p className='text-tertiary'>{dataType === 'calorieCount' ? 'Calories' : dataType === 'proteinCount' ? 'Proteines' : dataType === 'carbohydrateCount' ? 'Glucides' : 'Lipides'}</p>
      </div>
    </div>
  )
}

export default InfoCard