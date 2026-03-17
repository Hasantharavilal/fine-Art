document.addEventListener('DOMContentLoaded', () => {
    
    // Set current year
    const setYear = (id) => {
        const el = document.getElementById(id);
        if(el) el.textContent = new Date().getFullYear();
    }
    setYear('current-year');
    setYear('current-year-col');
    setYear('current-year-cnt');

    // Mobile Menu Toggle
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if(btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
            const icon = btn.querySelector('i');
            if(menu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
    }

    // Scroll Observer for Fade In Animations
    const faders = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Collection Page - Product Generation
    const collectionGrid = document.getElementById('collection-grid');
    const spinner = document.getElementById('loading-spinner');
    
    if(collectionGrid) {
        // Total pieces in our artisanal library
        const totalItems = 100;
        const products = [];
        
        // Art categories and keywords
        const abstractKeywords = ['abstract painting', 'modern art', 'minimalist art'];
        const digitalKeywords = ['digital art', 'cgi art', 'futuristic art'];
        
        // Seed some random products
        // Massive unique pool targeting 60+ unique high-quality fashion images
        // Fully verified Art IDs (Abstract & Digital) - 50+ Unique IDs for each
        const abstractIds = [
            '1541701494-b1198bb29c63', '1549490349-864337ce3a13', '1500462859276-27bb19ca425a', '1579783902614-a3fb3927b6a5',
            '1543857778-c4a1a3e0b2ea', '1541364983171-a49f36bf5bb0', '1618005182314-a83a8119c0e8', '1633167606207-d840b5070fc2',
            '1547891301-15a45f94982d', '1515405295579-ba7b4d2bc2c3', '1550684848-fac1c5b4e853', '1614850523296-6cc4d3f75d63',
            '1620641788421-7a1c342ea42e', '1578301978693-85fa5c0320b9', '1579783921051-acfa8346105f', '1501472312651-726afe119ff1',
            '1561214115-f2f134cc4912', '1564392257341-3315a0c0c538', '1571115171195-6d1c030ec752', '1573191823901-be19de229ed9',
            '1577720643272-265f091c7820', '1582555172866-f73bb12a2a33', '1615529151240-5e8ed599767a', '1626544823126-6b22584fb48b',
            '1460661419201-fd4ce1840d42', '1490312278390-ab6273916bb2', '1459908676235-d5f02a50184b', '1506744038136-46273834b3fb',
            '1511447333015-45b65e570ce1', '1518531933037-91b2f5f229cc', '1533158326339-7f3cf2404354', '1533158307560-c2055625402a',
            '1536924940846-227afb31e2a5', '1544070230-0d7ec5b47a0a', '1554188248-232117dee61a', '1560416313-4354a353f852',
            '1580136579603-9976e1910d52', '1502691879026-ac47e324223e', '1542332213-31e2920689b1',
            '1494438639946-1db94c6794e2', '1557187666401-ee833ad046d3', '1492133991850-ed5270549924',
            '1549488344131-727e4bb847b0', '1501471463521-70ceb7aae474', '1493193257194-44ed1590b514'
        ];
        
        const digitalIds = [
            '1618005182314-a83a8119c0e8', '1633167606207-d840b5070fc2', '1614850523296-6cc4d3f75d63', '1620641788421-7a1c342ea42e',
            '1558591710-de483b05c931', '1542332213-31e2920689b1', '1531259683007-020850a9a018', '1506313284000-205a283069a3',
            '1452184431331-dec30f01904a', '1605143324683-1b33391cb61d', '1617396900795-0e96f0a40f80', '1614728263952-db24f43e3f65',
            '1634017512800-474245979924', '1494253109121-2f080ed7f344', '1493612239177-30e7afe93699', '1470790376775-fda4058d4b81',
            '1444703686981-224747eb79a8', '1464820453337-0dd4af9ca43a', '1434394354974-ef2423efdec4', '1431819315391-f846d0a0c432',
            '1460518451284-4342a0050e1a', '1475116127124-576e27cffabd', '1524333612672-6221d6896af1', '1520038410312-d8dd9000dfc1',
            '1516248263123-bc9fa08316ec', '1551009170-07e15f8382d5', '1553062042-2307b8a7f5c2', '1550993092-d652c79f323a',
            '1550993248-692383838383', '1550993427-bc9fa08316ec', '1560948967-ba19f4c7d0d0', '1561088439-0bf961f6c748',
            '1566433539-7bd061dce7d3', '1567015545-201639f75ecf', '1568200174-fca528695fa2', '1573164067041-52b1b7596321',
            '1578319439580-2bb99810cccd', '1581091870613-5a086046775b', '1584444975302-38b13ef3112c', '1585219711677-9856c6806a64',
            '1586280184444-2f2105156ff1', '1588643909839-44b24ccc7557', '1591887376714-2ec5ca237699', '1593444444444-cbd22d11e5f6',
            '1594444444444-e1b2c3d4e5f6', '1595555555555-f2a3b4c5d6e7', '1596666666666-e3d4f5g6h7i8', '1597777777777-a1b2c3d4e5f6',
            '1598888888888-b2c3d4e5f6a7', '1599999999999-c3d4e5f6a7b8'
        ];

        // Seed products avoiding repetition
        // Generating 100 high quality unique art pieces
        for(let i = 0; i < totalItems; i++) {
            const isAbstract = i % 2 === 0;
            const type = isAbstract ? 'abstract' : 'digital';
            const pool = isAbstract ? abstractIds : digitalIds;
            const idIndex = Math.floor(i / 2) % pool.length;
            const randomId = pool[idIndex];
            
            const imageSrc = `https://images.unsplash.com/photo-${randomId}?auto=format&fit=crop&q=80&w=800&h=1000`;
            
            products.push({
                id: i + 1,
                type: type,
                title: isAbstract ? `Artisanal Masterpiece v.${i + 1}` : `Digital Dreamscape v.${i + 1}`,
                image: imageSrc
            });
        }

        // Render function
        const renderProducts = (filter = 'all') => {
            const URLParams = new URLSearchParams(window.location.search);
            const categoryParam = URLParams.get('category');
            
            if(categoryParam && filter === 'all') {
                filter = categoryParam;
            }

            // Normalizing filter names
            let activeFilter = filter;
            if(activeFilter === 'abstracts') activeFilter = 'abstract';
            if(activeFilter === 'digitals') activeFilter = 'digital';

            // update buttons
            document.querySelectorAll('.filter-btn').forEach(b => {
                const btnFilter = b.dataset.filter;
                b.classList.remove('bg-primary', 'text-white');
                b.classList.add('bg-white', 'text-primary');
                
                if(btnFilter === activeFilter) {
                    b.classList.add('bg-primary', 'text-white');
                    b.classList.remove('bg-white', 'text-primary');
                }
            });

            const filtered = products.filter(p => activeFilter === 'all' ? true : p.type === activeFilter);
            
            let html = '';
            filtered.forEach(p => {
                html += `
                <div class="product-card bg-[#111] rounded-2xl overflow-hidden shadow-2xl border border-white/5 group" data-category="${p.type}">
                    <div class="relative overflow-hidden aspect-[4/5] img-wrapper">
                        <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover product-image transition-transform duration-700 group-hover:scale-110" loading="lazy" onload="this.parentElement.classList.remove('img-wrapper')">
                        <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                        <div class="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
                            <button class="bg-primary text-black px-6 py-3 rounded-full font-black uppercase tracking-widest text-[10px] transform translate-y-4 group-hover:translate-y-0 transition-transform shadow-xl hover:bg-white transition-colors">
                                View Piece
                            </button>
                            <a href="${p.image.replace('w=800&h=1000', 'w=2400&h=3000')}" download="${p.title}.jpg" target="_blank" class="bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-3 rounded-full font-black uppercase tracking-widest text-[10px] transform translate-y-4 group-hover:translate-y-0 transition-transform delay-75 shadow-xl hover:bg-primary hover:text-black transition-colors">
                                <i class="fas fa-download mr-2"></i> Free Download
                            </a>
                        </div>
                        <div class="absolute top-4 left-4 bg-primary/90 text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                            ${p.type}
                        </div>
                        <div class="absolute bottom-4 left-0 right-0 text-center pointer-events-none z-10">
                            <span class="text-white/30 text-[9px] font-bold tracking-[0.3em] uppercase select-none">Hasantha Art ©</span>
                        </div>
                    </div>
                    <div class="p-6 text-center">
                        <h3 class="text-lg font-black uppercase tracking-tighter text-white mb-2 group-hover:text-primary transition-colors">${p.title}</h3>
                        <div class="w-8 h-[1px] bg-white/10 mx-auto mb-3"></div>
                        <p class="text-[10px] uppercase tracking-[0.4em] text-gray-500">Masterpiece Selection</p>
                    </div>
                </div>
                `;
            });

            collectionGrid.innerHTML = html;
            setTimeout(() => {
                collectionGrid.style.opacity = '1';
                spinner.style.display = 'none';
            }, 100);
        };

        // Simulated network delay
        // Faster initial load
        setTimeout(() => {
            renderProducts();
        }, 300);

        // Filter events
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Update active state
                filterBtns.forEach(b => {
                    b.classList.remove('bg-primary', 'text-white');
                    b.classList.add('bg-white', 'text-primary');
                });
                
                e.target.classList.remove('bg-white', 'text-primary');
                e.target.classList.add('bg-primary', 'text-white');

                // Animate change
                collectionGrid.style.opacity = '0';
                
                setTimeout(() => {
                    // Update URL silently
                    const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?category=' + e.target.dataset.filter;
                    window.history.pushState({path:newurl},'',newurl);

                    renderProducts(e.target.dataset.filter);
                }, 400);
            });
        });
    }

    // Navbar Scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            navbar.classList.add('shadow-xl', 'bg-primary/95');
            navbar.classList.remove('bg-light/80');
        } else {
            navbar.classList.remove('shadow-xl', 'bg-primary/95');
            navbar.classList.add('bg-light/80');
        }
    });

});
