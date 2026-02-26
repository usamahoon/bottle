// Database of Components with relative performance tiers
const cpuDB = [
    { id: "intel_14900k", name: "Intel Core i9-14900K", score: 100 },
    { id: "amd_7950x3d", name: "AMD Ryzen 9 7950X3D", score: 98 },
    { id: "intel_13900k", name: "Intel Core i9-13900K", score: 95 },
    { id: "amd_7800x3d", name: "AMD Ryzen 7 7800X3D", score: 96 },
    { id: "intel_14700k", name: "Intel Core i7-14700K", score: 92 },
    { id: "amd_7900x", name: "AMD Ryzen 9 7900X", score: 90 },
    { id: "intel_13700k", name: "Intel Core i7-13700K", score: 88 },
    { id: "amd_7700x", name: "AMD Ryzen 7 7700X", score: 85 },
    { id: "intel_14600k", name: "Intel Core i5-14600K", score: 83 },
    { id: "intel_13600k", name: "Intel Core i5-13600K", score: 80 },
    { id: "amd_7600x", name: "AMD Ryzen 5 7600X", score: 78 },
    { id: "intel_12900k", name: "Intel Core i9-12900K", score: 82 },
    { id: "intel_12700k", name: "Intel Core i7-12700K", score: 75 },
    { id: "amd_5950x", name: "AMD Ryzen 9 5950X", score: 74 },
    { id: "amd_5800x3d", name: "AMD Ryzen 7 5800X3D", score: 77 },
    { id: "intel_12400f", name: "Intel Core i5-12400F", score: 60 },
    { id: "amd_5600x", name: "AMD Ryzen 5 5600X", score: 58 },
    { id: "intel_11400f", name: "Intel Core i5-11400F", score: 50 },
    { id: "amd_3600", name: "AMD Ryzen 5 3600", score: 42 },
    { id: "intel_10100f", name: "Intel Core i3-10100F", score: 35 },
    { id: "amd_1600", name: "AMD Ryzen 5 1600", score: 25 },
    { id: "intel_4790k", name: "Intel Core i7-4790K", score: 20 }
];

const gpuDB = [
    { id: "rtx_4090", name: "NVIDIA RTX 4090", score: 100 },
    { id: "rcp_7900_xtx", name: "AMD RX 7900 XTX", score: 85 },
    { id: "rtx_4080_super", name: "NVIDIA RTX 4080 SUPER", score: 82 },
    { id: "rtx_4080", name: "NVIDIA RTX 4080", score: 80 },
    { id: "rx_7900_xt", name: "AMD RX 7900 XT", score: 76 },
    { id: "rtx_4070_ti_super", name: "NVIDIA RTX 4070 Ti SUPER", score: 70 },
    { id: "rtx_4070_ti", name: "NVIDIA RTX 4070 Ti", score: 66 },
    { id: "rx_7800_xt", name: "AMD RX 7800 XT", score: 62 },
    { id: "rtx_4070_super", name: "NVIDIA RTX 4070 SUPER", score: 62 },
    { id: "rtx_3090_ti", name: "NVIDIA RTX 3090 Ti", score: 65 },
    { id: "rtx_3090", name: "NVIDIA RTX 3090", score: 60 },
    { id: "rtx_4070", name: "NVIDIA RTX 4070", score: 56 },
    { id: "rx_6800_xt", name: "AMD RX 6800 XT", score: 54 },
    { id: "rtx_3080", name: "NVIDIA RTX 3080", score: 52 },
    { id: "rtx_4060_ti", name: "NVIDIA RTX 4060 Ti", score: 45 },
    { id: "rx_7700_xt", name: "AMD RX 7700 XT", score: 44 },
    { id: "rtx_3070", name: "NVIDIA RTX 3070", score: 42 },
    { id: "rtx_4060", name: "NVIDIA RTX 4060", score: 36 },
    { id: "rx_7600", name: "AMD RX 7600", score: 34 },
    { id: "rtx_3060_ti", name: "NVIDIA RTX 3060 Ti", score: 34 },
    { id: "rtx_3060", name: "NVIDIA RTX 3060", score: 28 },
    { id: "rx_6600", name: "AMD RX 6600", score: 26 },
    { id: "gtx_1660_ti", name: "NVIDIA GTX 1660 Ti", score: 18 },
    { id: "gtx_1060", name: "NVIDIA GTX 1060", score: 12 },
    { id: "gtx_1050_ti", name: "NVIDIA GTX 1050 Ti", score: 8 }
];

const resMultipliers = {
    "1080": { cpuReq: 1.2, gpuReq: 0.8 },
    "1440": { cpuReq: 1.0, gpuReq: 1.0 },
    "2160": { cpuReq: 0.7, gpuReq: 1.4 }
};

document.addEventListener("DOMContentLoaded", () => {
    const cpuSelect = document.getElementById("cpu-select");
    const gpuSelect = document.getElementById("gpu-select");
    const ramSelect = document.getElementById("ram-select");
    const purposeSelect = document.getElementById("purpose-select");
    const resSelect = document.getElementById("resolution-select");
    const calcBtn = document.getElementById("calculate-btn");

    cpuDB.sort((a, b) => b.score - a.score).forEach(cpu => {
        const opt = document.createElement("option");
        opt.value = cpu.id;
        opt.textContent = cpu.name;
        cpuSelect.appendChild(opt);
    });

    gpuDB.sort((a, b) => b.score - a.score).forEach(gpu => {
        const opt = document.createElement("option");
        opt.value = gpu.id;
        opt.textContent = gpu.name;
        gpuSelect.appendChild(opt);
    });

    calcBtn.addEventListener("click", () => {
        const cpuId = cpuSelect.value;
        const gpuId = gpuSelect.value;
        const ramVal = ramSelect.value;
        const purposeVal = purposeSelect.value;
        const res = resSelect.value;

        if (!cpuId || !gpuId) {
            alert("Please select both a CPU and a GPU.");
            return;
        }

        const cpu = cpuDB.find(c => c.id === cpuId);
        const gpu = gpuDB.find(g => g.id === gpuId);
        const multis = resMultipliers[res];

        calculateBottleneck(cpu, gpu, multis, ramVal, purposeVal);
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector(".mobile-menu-btn");
    const mainNav = document.getElementById("main-nav");

    if (mobileBtn && mainNav) {
        mobileBtn.addEventListener("click", () => {
            mainNav.classList.toggle("active");
        });

        mainNav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mainNav.classList.remove("active");
            });
        });
    }

    // Scroll Reveal Animations
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Optional: Stop observing once revealed
            }
        });
    }, observerOptions);

    document.querySelectorAll(".reveal").forEach(el => {
        observer.observe(el);
    });
});

function calculateBottleneck(cpu, gpu, multis, ram, purpose) {
    let adjCpuScore = cpu.score / multis.cpuReq;
    let adjGpuScore = gpu.score / multis.gpuReq;

    // Adjust for Productivity: Requires heavier CPU
    if (purpose === "productivity") {
        adjCpuScore = adjCpuScore * 0.9; // CPU effectively weaker for intense workloads
    }

    const ratio = adjCpuScore / adjGpuScore;

    let bottleneckPercent = 0;
    let bottleneckType = "Balanced";
    let cpuUtil = 100;
    let gpuUtil = 100;

    if (ratio < 0.9) {
        bottleneckType = "CPU";
        bottleneckPercent = Math.min(((1 - ratio) * 100).toFixed(1), 100);
        gpuUtil = Math.max((ratio * 100).toFixed(1), 10);
        cpuUtil = 100;
    } else if (ratio > 1.1) {
        bottleneckType = "GPU";
        const invRatio = 1 / ratio;
        bottleneckPercent = Math.min(((1 - invRatio) * 100).toFixed(1), 100);
        cpuUtil = Math.max((invRatio * 100).toFixed(1), 10);
        gpuUtil = 100;
    } else {
        bottleneckType = "Balanced";
        bottleneckPercent = Math.abs((1 - ratio) * 50).toFixed(1);
        cpuUtil = 100;
        gpuUtil = 100;
    }

    renderResults(bottleneckType, bottleneckPercent, cpuUtil, gpuUtil, cpu.name, gpu.name, ram, purpose);
}

function renderResults(type, percent, cpuUtil, gpuUtil, cpuName, gpuName, ram, purpose) {
    const section = document.getElementById("results-section");
    const circle = document.getElementById("bottleneck-circle");
    const percentText = document.getElementById("bottleneck-percentage");
    const title = document.getElementById("diagnosis-title");
    const text = document.getElementById("diagnosis-text");
    const ramWarningWrapper = document.getElementById("ram-diagnosis");

    const cpuBar = document.getElementById("cpu-bar");
    const gpuBar = document.getElementById("gpu-bar");
    const cpuVal = document.getElementById("cpu-util-val");
    const gpuVal = document.getElementById("gpu-util-val");

    section.style.display = "block";
    setTimeout(() => { section.classList.remove("hidden"); }, 10);

    circle.setAttribute("stroke-dasharray", `${percent}, 100`);

    let count = 0;
    const target = parseFloat(percent);

    if (window.percentInterval) clearInterval(window.percentInterval);

    window.percentInterval = setInterval(() => {
        if (count >= target) {
            clearInterval(window.percentInterval);
            percentText.textContent = `${target}%`;
        } else {
            count += target > 50 ? 2 : 1;
            if (count > target) count = target;
            percentText.textContent = `${count.toFixed(0)}%`;
        }
    }, 20);

    circle.classList.remove("severe", "moderate", "fine");
    let colorVar = "";

    let contextStr = purpose === "productivity" ? "For rendering and workstation tasks, " : "For gaming, ";

    if (percent > 20) {
        circle.classList.add("severe");
        colorVar = "var(--danger)";
        title.style.color = colorVar;
        title.textContent = `Severe ${type} Bottleneck`;
        if (type === "CPU") {
            text.textContent = `${contextStr}your ${cpuName} is far too weak for the ${gpuName}. The graphics card is severely underutilized, waiting for the processor.`;
        } else {
            text.textContent = `${contextStr}your ${gpuName} is severely limiting your ${cpuName}. To get more frames, you'll need a stronger graphics card or to lower your graphical settings.`;
        }
    } else if (percent > 10) {
        circle.classList.add("moderate");
        colorVar = "var(--warning)";
        title.style.color = colorVar;
        title.textContent = `Moderate ${type} Bottleneck`;
        text.textContent = `${contextStr}there is a noticeable ${type} bottleneck. Some computing power is being left on the table, but the system is still functional.`;
    } else {
        circle.classList.add("fine");
        colorVar = "var(--success)";
        title.style.color = colorVar;
        title.textContent = `Perfect Match`;
        text.textContent = `Excellent pairing! ${contextStr}your components are working great together. Any bottleneck is negligible.`;
    }

    // RAM checks
    ramWarningWrapper.classList.add("hidden");
    if (ram === "8") {
        ramWarningWrapper.classList.remove("hidden");
        ramWarningWrapper.innerHTML = `<strong>⚠️ Warning:</strong> Even if your CPU and GPU match perfectly, 8GB of RAM is not enough for modern ${purpose === 'gaming' ? 'AAA games' : 'productivity tasks'}. You will experience severe stuttering. Upgrade to 16GB immediately.`;
    } else if (ram === "16" && purpose === "productivity") {
        ramWarningWrapper.classList.remove("hidden");
        ramWarningWrapper.innerHTML = `<strong>⚠️ Warning:</strong> While 16GB is fine for gaming, it is generally considered the bare minimum for heavy productivity (video editing, 3D rendering). Consider 32GB for a smoother workflow.`;
    }

    setTimeout(() => {
        cpuBar.style.width = `${cpuUtil}%`;
        gpuBar.style.width = `${gpuUtil}%`;
        cpuVal.textContent = `${cpuUtil}%`;
        gpuVal.textContent = `${gpuUtil}%`;

        cpuBar.style.background = cpuUtil == 100 ? colorVar : "var(--accent-primary)";
        gpuBar.style.background = gpuUtil == 100 ? colorVar : "var(--accent-primary)";
        if (type === "Balanced" || percent <= 10) {
            cpuBar.style.background = "var(--success)";
            gpuBar.style.background = "var(--success)";
        }

    }, 100);

    setTimeout(() => { section.scrollIntoView({ behavior: "smooth", block: "nearest" }); }, 300);
}
