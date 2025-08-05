export const formatCurrency = (value: number): string => {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

export const formatNumber = (value: number): string => {
    return value.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

export const formatPercentage = (value: number): string => {
    return `${value.toFixed(1)}%`;
};

export const formatDate = (date: Date | string): string => {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
};

export const formatDateTime = (date: Date | string): string => {
    return new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(date));
};
