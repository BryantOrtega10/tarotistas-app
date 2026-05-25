export function formatShortSpanishDate(isoString: string) {
    if (!isoString) return "";

    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "";
    const parts = new Intl.DateTimeFormat("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC"
    }).formatToParts(date);

    const day = parts.find(p => p.type === "day")?.value;
    const month = parts.find(p => p.type === "month")?.value;
    const year = parts.find(p => p.type === "year")?.value;

    return `${day} de ${month} de ${year}`;
}

export function formatDate(isoString: string) {
    if (!isoString) return "";

    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "";
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export function formatSpanishDate(isoString: string) {
    if (!isoString) return "";

    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "";
    const parts = new Intl.DateTimeFormat("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        // timeZone: "UTC"
    }).formatToParts(date);

    const day = parts.find(p => p.type === "day")?.value;
    const month = parts.find(p => p.type === "month")?.value?.replace(".", "");
    const year = parts.find(p => p.type === "year")?.value;
    const hour = parts.find(p => p.type === "hour")?.value;
    const minute = parts.find(p => p.type === "minute")?.value;
    const dayPeriod = parts.find(p => p.type === "dayPeriod")?.value;

    return `${day} de ${month} de ${year}, ${hour}:${minute} ${dayPeriod}`;
}

export function formatShortSpanishDateHour(isoString: string) {
    if (!isoString) return "";

    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "";
    const parts = new Intl.DateTimeFormat("es-ES", {
        day: "numeric",
        month: "short",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        // timeZone: "UTC"
    }).formatToParts(date);

    const year = parts.find(p => p.type === "year")?.value;
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hour = parts.find(p => p.type === "hour")?.value;
    const minute = parts.find(p => p.type === "minute")?.value;
    const dayPeriod = parts.find(p => p.type === "dayPeriod")?.value;

    return `${day}/${month}/${year}, ${hour}:${minute} ${dayPeriod}`;
}