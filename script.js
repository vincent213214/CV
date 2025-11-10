document.addEventListener('DOMContentLoaded', function() {
    // Get all chart elements for the first chart
    const linePath = document.querySelector('.chart-path.line-2');
    const bars = document.querySelectorAll('.chart-bar');
    
    // Reset animations for the first chart
    function resetAnimations() {
        linePath.style.animation = 'none';
        bars.forEach(bar => {
            bar.style.animation = 'none';
            bar.style.opacity = '0';
        });
        
        setTimeout(() => {
            linePath.style.animation = 'draw 1.5s ease-in-out forwards';
            bars.forEach(bar => {
                bar.style.animation = 'growBar 0.8s ease-out forwards';
            });
        }, 10);
    }
    
    // Initial animation for the first chart
    resetAnimations();

    // Add bar hover effects for the first chart
    bars.forEach(bar => {
        bar.addEventListener('mouseover', function() {
            this.style.fill = '#2a70c2';
            this.style.filter = 'drop-shadow(0 0 4px rgba(0,0,0,0.2))';
        });
        
        bar.addEventListener('mouseout', function() {
            this.style.fill = '#4a90e2';
            this.style.filter = 'none';
        });
    });

    // Add line hover effect for the first chart
    linePath.addEventListener('mouseover', function() {
        this.style.strokeWidth = '4px';
        this.style.filter = 'drop-shadow(0 0 4px rgba(46, 204, 113, 0.3))';
    });
    
    linePath.addEventListener('mouseout', function() {
        this.style.strokeWidth = '3px';
        this.style.filter = 'none';
    });

    // Replay animation button for the first chart
    const replayBtn = document.createElement('button');
    replayBtn.textContent = 'Replay Animation';
    replayBtn.className = 'replay-btn';
    replayBtn.addEventListener('click', resetAnimations);
    
    document.querySelector('.chart-legend').appendChild(replayBtn);

    // Legend hover effects for the first chart
    const legendItems = document.querySelectorAll('.legend-item');
    legendItems.forEach(item => {
        item.addEventListener('mouseover', function() {
            const isLine1 = this.querySelector('.legend-color').classList.contains('line-1-color');
            
            if (isLine1) {
                // Highlight bars
                bars.forEach(bar => {
                    bar.style.filter = 'drop-shadow(0 0 6px rgba(0,0,0,0.3))';
                });
            } else {
                // Highlight line
                linePath.style.strokeWidth = '4px';
                linePath.style.filter = 'drop-shadow(0 0 4px rgba(46, 204, 113, 0.3))';
            }
        });
        
        item.addEventListener('mouseout', function() {
            bars.forEach(bar => {
                bar.style.filter = 'none';
            });
            linePath.style.strokeWidth = '3px';
            linePath.style.filter = 'none';
        });
    });

    // PIE CHART IMPLEMENTATION
    // Data for the pie chart 01
    const chartData01 = [
        { label: 'Product Management', value: 25, color: '#4e79a7' },
        { label: 'Digital Marketing', value: 20, color: '#f28e2b' },
        { label: 'Customer Service', value: 17, color: '#e15759' },
        { label: 'Data Analysis', value: 10, color: '#76b7b2' },
        { label: 'Content Creation', value: 11, color: '#59a14f' },
        { label: 'Marketplace Management', value: 17, color: '#edc948' }
    ];

    const pieChart01 = document.getElementById('pieChart01');
    const legend01 = document.getElementById('chartLegend01');
    const replayButton01 = document.getElementById('replayButton01');

    // Animation timings
    const PIE_ANIMATION_DURATION = 1500;
    const LEGEND_ANIMATION_DELAY = 500;
    const BUTTON_ANIMATION_DELAY = 200;

    initPieAnimation();

    if (replayButton01) {
        replayButton01.addEventListener('click', function() {
            resetPieAnimation();
            setTimeout(initPieAnimation, 50);
        });
    }

    function initPieAnimation() {
        const totalValue01 = chartData01.reduce((sum, item) => sum + item.value, 0);
        animatePieChart(totalValue01);
    }

    function resetPieAnimation() {
        if (pieChart01) {
            pieChart01.classList.remove('animate');
            pieChart01.style.transition = 'none';
            pieChart01.style.opacity = '0';
            pieChart01.style.transform = 'rotate(-90deg)';
            
            // Reset all percentage variables
            for (let i = 1; i <= 6; i++) {
                pieChart01.style.setProperty(`--percentage${i}-01`, '0%');
            }
            
            void pieChart01.offsetWidth;
        }
        
        if (legend01) {
            legend01.classList.remove('show');
            legend01.innerHTML = '';
        }
        
        if (replayButton01) {
            replayButton01.classList.remove('show');
        }
    }

    function animatePieChart(totalValue01) {
        if (!pieChart01) return;
        
        pieChart01.style.transition = `opacity 1s ease, transform 1.5s ease`;
        
        // Set initial values
        for (let i = 1; i <= 6; i++) {
            pieChart01.style.setProperty(`--percentage${i}-01`, '0%');
        }
        
        setTimeout(() => {
            pieChart01.classList.add('animate');
            pieChart01.style.opacity = '1';
            pieChart01.style.transform = 'rotate(0deg)';
            
            // Calculate cumulative percentages
            let cumulative = 0;
            chartData01.forEach((item, index) => {
                const percentage = (item.value / totalValue01) * 100;
                cumulative += percentage;
                pieChart01.style.setProperty(`--color${index+1}-01`, item.color);
                pieChart01.style.setProperty(`--percentage${index+1}-01`, `${cumulative}%`);
            });
            
            // Animate segments
            pieChart01.style.transition = `
                --percentage1-01 ${PIE_ANIMATION_DURATION}ms ease,
                --percentage2-01 ${PIE_ANIMATION_DURATION}ms ease,
                --percentage3-01 ${PIE_ANIMATION_DURATION}ms ease,
                --percentage4-01 ${PIE_ANIMATION_DURATION}ms ease,
                --percentage5-01 ${PIE_ANIMATION_DURATION}ms ease,
                --percentage6-01 ${PIE_ANIMATION_DURATION}ms ease
            `;
            
            setTimeout(showLegend, PIE_ANIMATION_DURATION);
        }, 10);
    }

    function showLegend() {
        if (!legend01) return;
        
        const totalValue01 = chartData01.reduce((sum, item) => sum + item.value, 0);
        legend01.classList.add('show');
        
        chartData01.forEach((item, index) => {
            const percentage = ((item.value / totalValue01) * 100).toFixed(1);
            const legendItem01 = document.createElement('div');
            legendItem01.className = 'legend-item-01';
            legendItem01.style.transition = `
                opacity 0.4s ease ${index * BUTTON_ANIMATION_DELAY}ms,
                transform 0.4s ease ${index * BUTTON_ANIMATION_DELAY}ms
            `;
            
            const colorBox01 = document.createElement('div');
            colorBox01.className = 'legend-color-01';
            colorBox01.style.backgroundColor = item.color;
            
            const label01 = document.createElement('span');
            label01.className = 'legend-label-01';
            label01.textContent = `${item.label} (${percentage}%)`;
            
            legendItem01.appendChild(colorBox01);
            legendItem01.appendChild(label01);
            legend01.appendChild(legendItem01);
            
            setTimeout(() => {
                legendItem01.classList.add('show');
            }, index * BUTTON_ANIMATION_DELAY);
        });
        
        setTimeout(() => {
            if (replayButton01) {
                replayButton01.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                replayButton01.classList.add('show');
            }
        }, chartData01.length * BUTTON_ANIMATION_DELAY + 200);
    }
});