import {html, LitElement, unsafeCSS, css} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import tailwind from '../styles/tailwind.css?inline';

@customElement('lit-slider')
export class Slider extends LitElement {
    @state()
    private images: string[] = [
        'https://www.dummyimage.com/800x400/111/fff)',
        'https://www.dummyimage.com/800x400/222/fff)',
        'https://www.dummyimage.com/800x400/333/fff)',
        'https://www.dummyimage.com/800x400/444/fff)',
        'https://www.dummyimage.com/800x400/555/fff)',
        'https://www.dummyimage.com/800x400/666/fff)',
        'https://www.dummyimage.com/800x400/777/fff)',
        'https://www.dummyimage.com/800x400/888/fff)',
        'https://www.dummyimage.com/800x400/999/fff)',
        'https://www.dummyimage.com/800x400/000/fff)',
    ];

    @state()
    private currentSlide: number = 0;

    @state()
    private imagesPerSlide: number = 1;

    private resizeObserver!: ResizeObserver;

    static styles = [unsafeCSS(tailwind),
                    css`
                        :host {
                            display: block;
                        }
                    `];

    render() {
        return html`
            <div class="min-h-screen flex flex-col items-center justify-center gap-8 p-6 bg-zinc-50 dark:bg-zinc-900  
                        text-zinc-900 dark:text-zinc-100 transition-colors duration-300">

                <div class="flex items-center gap-4 w-full">
                    <button @click="${this.prevSlide}"
                            class="px-4 py-2 bg-gray-300 dark:bg-gray-800 hover:bg-gray-400
                            hover:dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-full 
                            transition cursor-pointer">
                        <
                    </button>

                    <div class="overflow-hidden flex-1">

                        <div class="flex transition-transform duration-500 ease-in-out"
                             style="transform: translateX(-${this.currentSlide * 100}%)">
                            
                            ${this.slides.map(slide => html`
                                <div class="shrink-0 w-full flex items-center justify-center gap-4">
                                    
                                    ${slide.map(image => html`
                                        <img src="${image}" alt="Slide Image"
                                             class="flex-1 min-w-0 object-contain rounded-lg"/>
                                    `)}
                                    
                                </div>

                            `)}
                        </div>

                    </div>

                    <button @click="${this.nextSlide}"
                            class="px-4 py-2 bg-gray-300 dark:bg-gray-800 hover:bg-gray-400
                            hover:dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-full 
                            transition cursor-pointer">
                        >
                    </button>
                </div>
                
                <div class="flex justify-center">
                    ${this.currentSlide + 1} von ${this.slides.length}
                </div>
                
                <input id="addImage" type="text" placeholder="Bild-URL hinzufügen" @keydown="${this.addImage}"
                class="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg">

            </div>
        `;
    }

    connectedCallback() {
        super.connectedCallback();
        this.resizeObserver = new ResizeObserver(([entry]) => {
            const newCurrentSlide = Math.floor(this.currentSlide * this.imagesPerSlide / (entry.contentRect.width < 640 ? 1 : entry.contentRect.width < 1024 ? 2 : 3));
            const width = entry.contentRect.width;
            this.imagesPerSlide = width < 640 ? 1 : width < 1024 ? 2 : 3;
            this.currentSlide = newCurrentSlide;
        })

        this.resizeObserver.observe(this);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.resizeObserver.disconnect();
    }

    get slides() {
        const slides = [];

        for (let i = 0; i < this.images.length; i += this.imagesPerSlide) {
            slides.push(this.images.slice(i, i + this.imagesPerSlide));
        }

        return slides;
    }

    nextSlide = () => {
        this.currentSlide = this.currentSlide + 1 < this.slides.length ? this.currentSlide + 1 : 0;
    }

    prevSlide = () => {
        this.currentSlide = this.currentSlide - 1 >= 0 ? this.currentSlide - 1 : this.slides.length - 1;
    }

    addImage = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            const input = e.target as HTMLInputElement;
            if (input.value.trim()) {
                this.images = [...this.images, input.value.trim()];
                input.value = '';
            }
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'lit-slider': Slider;
    }
}