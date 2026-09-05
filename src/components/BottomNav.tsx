import React, { useState } from 'react';
import {
  Car,
  Plus,
  Settings,
  UploadCloud,
  Wrench,
  Fuel,
  CalendarClock,
  X,
} from 'lucide-react';
import { Vehicle } from '../types';

interface BottomNavProps {
  selectedVehicle: Vehicle | null;
  onSelectVehicle: (v: Vehicle | null) => void;
  onOpenSettingsModal: () => void;
  onOpenImportModal: () => void;
  onAddVehicle: () => void;
  onOpenServiceModal?: (type?: 'service' | 'repair' | 'upgrade') => void;
  onOpenFuelModal?: () => void;
  onOpenReminderModal?: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  selectedVehicle,
  onSelectVehicle,
  onOpenSettingsModal,
  onOpenImportModal,
  onAddVehicle,
  onOpenServiceModal,
  onOpenFuelModal,
  onOpenReminderModal,
}) => {
  const [isQuickOpen, setIsQuickOpen] = useState(false);

  const handleCenterClick = () => {
    if (selectedVehicle) {
      setIsQuickOpen(true);
    } else {
      onAddVehicle();
    }
  };

  return (
    <>
      {/* Quick Actions Sheet when Center Plus is clicked with selected vehicle */}
      {isQuickOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div
            className="fixed inset-0"
            onClick={() => setIsQuickOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-white dark:bg-dark-850 rounded-t-3xl border-t border-slate-200 dark:border-dark-750 p-5 shadow-2xl z-10 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] animate-slideUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-dark-750">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Быстрое действие</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {selectedVehicle ? `${selectedVehicle.make} ${selectedVehicle.model}` : 'Гараж'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsQuickOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg transition-colors"
                aria-label="Закрыть меню"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-4">
              <button
                onClick={() => {
                  setIsQuickOpen(false);
                  onOpenServiceModal?.('service');
                }}
                className="flex items-center space-x-2.5 p-3 rounded-2xl bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/30 dark:hover:bg-brand-900/40 text-brand-700 dark:text-brand-300 font-bold text-xs transition border border-brand-500/20 active:scale-95"
              >
                <div className="w-8 h-8 rounded-xl bg-brand-500 text-white flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <span className="block truncate">Запись ТО</span>
                  <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400 block">Работы / детали</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setIsQuickOpen(false);
                  onOpenFuelModal?.();
                }}
                className="flex items-center space-x-2.5 p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:hover:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-bold text-xs transition border border-emerald-500/20 active:scale-95"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                  <Fuel className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <span className="block truncate">Заправка</span>
                  <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400 block">Литры / чек</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setIsQuickOpen(false);
                  onOpenReminderModal?.();
                }}
                className="flex items-center space-x-2.5 p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/30 dark:hover:bg-amber-900/40 text-amber-700 dark:text-amber-300 font-bold text-xs transition border border-amber-500/20 active:scale-95"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0">
                  <CalendarClock className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <span className="block truncate">Регламент</span>
                  <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400 block">Интервал / напоминание</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setIsQuickOpen(false);
                  onAddVehicle();
                }}
                className="flex items-center space-x-2.5 p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-dark-800 dark:hover:bg-dark-750 text-slate-700 dark:text-slate-200 font-bold text-xs transition border border-slate-200 dark:border-dark-700 active:scale-95"
              >
                <div className="w-8 h-8 rounded-xl bg-slate-700 text-white flex items-center justify-center flex-shrink-0">
                  <Car className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <span className="block truncate">Новый авто</span>
                  <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400 block">В гараж</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Bottom Bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-dark-900/95 backdrop-blur-md border-t border-slate-200 dark:border-dark-800 transition-colors shadow-lg"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="max-w-lg mx-auto px-4 h-16 flex items-center justify-around relative">
          {/* 1. Garage Button */}
          <button
            onClick={() => onSelectVehicle(null)}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
              selectedVehicle === null
                ? 'text-brand-600 dark:text-brand-400 font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Car className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Гараж</span>
          </button>

          {/* 2. Current Car Tab (if selected) */}
          {selectedVehicle && (
            <button
              onClick={() => {}}
              className="flex flex-col items-center justify-center flex-1 py-1 text-brand-600 dark:text-brand-400 font-bold transition-colors truncate max-w-[85px]"
              title={`${selectedVehicle.make} ${selectedVehicle.model}`}
            >
              <Wrench className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] tracking-tight truncate w-full text-center">
                {selectedVehicle.model || 'Авто'}
              </span>
            </button>
          )}

          {/* 3. Center Plus / Action Button */}
          <div className="flex-1 flex justify-center">
            <button
              onClick={handleCenterClick}
              className="w-12 h-12 -mt-5 rounded-2xl bg-gradient-to-tr from-brand-600 to-brand-400 text-white flex items-center justify-center shadow-lg shadow-brand-500/35 border-2 border-white dark:border-dark-900 active:scale-95 transition-transform"
              title={selectedVehicle ? 'Быстрое добавление записи' : 'Добавить автомобиль'}
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>

          {/* 4. Backup Button */}
          <button
            onClick={onOpenImportModal}
            className="flex flex-col items-center justify-center flex-1 py-1 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            title="Импорт и экспорт бэкапа"
          >
            <UploadCloud className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Бэкап</span>
          </button>

          {/* 5. Settings Button */}
          <button
            onClick={onOpenSettingsModal}
            className="flex flex-col items-center justify-center flex-1 py-1 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            title="Настройки приложения"
          >
            <Settings className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Настройки</span>
          </button>
        </div>
      </nav>
    </>
  );
};
