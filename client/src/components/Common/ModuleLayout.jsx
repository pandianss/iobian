import React from 'react';
import Card from './Card';
import Button from './Button';
import { ArrowLeft, Plus, Save, Printer, List } from 'lucide-react';

const ModuleLayout = ({
    title,
    icon: Icon,
    viewMode,
    onViewModeChange,
    actions,
    children,
    isLoading
}) => {
    return (
        <div className="flex flex-col h-full gap-6 p-6 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                    {Icon && <Icon className="text-primary-color" size={28} />}
                    <h2 className="text-2xl font-bold text-text-primary">{title}</h2>
                </div>

                <div className="flex items-center gap-3">
                    {viewMode === 'list' ? (
                        <Button
                            icon={Plus}
                            onClick={() => onViewModeChange('new')}
                            isLoading={isLoading}
                        >
                            New Entry
                        </Button>
                    ) : (
                        <Button
                            variant="secondary"
                            icon={List}
                            onClick={() => onViewModeChange('list')}
                        >
                            Back to List
                        </Button>
                    )}
                    {actions}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 min-h-0 overflow-y-auto">
                {children}
            </div>

            <style>{`
        .module-content-container {
          animation: slideUp 0.3s ease-out;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
};

export default ModuleLayout;
