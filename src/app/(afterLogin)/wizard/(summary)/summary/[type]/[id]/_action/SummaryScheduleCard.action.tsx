'use client';

import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useWizardStore } from '@/app/(afterLogin)/wizard/store';
import SummaryCardComponent from '../_component/SummaryCard.component';
import SummaryKeyValueListComponent from '../_component/SummaryKeyValueList.component';
import SelectDayScheduleToggleAction from '@/app/(afterLogin)/wizard/(standard)/step2/_action/schedule/SelectDayScheduleToggle.action';
import FormEditingDayTimeAction from '@/app/(afterLogin)/wizard/(standard)/step2/_action/schedule/FormEditingDayTime.action';
import ReadWorkScheduleWarningAction from '@/app/(afterLogin)/wizard/(standard)/step2/_action/schedule/ReadWorkScheduleWarning.action';

export default function SummaryScheduleCardAction() {
  const { step2, setStep2 } = useWizardStore(
    useShallow((state) => ({
      step2: state.step2,
      setStep2: state.setStep2,
    })),
  );

  const [isEditing, setIsEditing] = useState(false);
  const [snapshot, setSnapshot] = useState({
    wizDaysConfig: step2.wizDaysConfig,
    wizWeeklyHoliday: step2.wizWeeklyHoliday,
  });

  const handleToggleEdit = () => {
    if (isEditing) {
      setIsEditing(false);
      setStep2({ editingDay: null });
    } else {
      setSnapshot({
        wizDaysConfig: step2.wizDaysConfig,
        wizWeeklyHoliday: step2.wizWeeklyHoliday,
      });
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    setStep2({
      wizDaysConfig: snapshot.wizDaysConfig,
      wizWeeklyHoliday: snapshot.wizWeeklyHoliday,
      editingDay: null,
    });
    setIsEditing(false);
  };

  const activeDays = Object.entries(step2.wizDaysConfig || {}).filter(([, val]) => val.enabled);

  const summaryItems = activeDays.map(([dayKey, dayVal]) => ({
    label: dayKey,
    value: `${dayVal.startTime} ~ ${dayVal.endTime} (휴게 ${dayVal.breakTime})`,
  }));

  summaryItems.push({
    label: '유급주휴일',
    value: `매주 ${step2.wizWeeklyHoliday || '일요일'}`,
  });

  return (
    <SummaryCardComponent
      title="근무 요일 및 시간"
      isEditing={isEditing}
      onToggleEdit={handleToggleEdit}
      onCancelEdit={handleCancelEdit}
    >
      {isEditing ? (
        <div className="space-y-4">
          <SelectDayScheduleToggleAction />
          <FormEditingDayTimeAction />
          <ReadWorkScheduleWarningAction />
        </div>
      ) : (
        <SummaryKeyValueListComponent
          columns={2}
          emptyText="근무 요일이 설정되지 않았습니다."
          items={summaryItems}
        />
      )}
    </SummaryCardComponent>
  );
}
