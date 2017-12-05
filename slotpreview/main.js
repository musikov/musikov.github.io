(function() {
    let updateConfig = () => {
        onConfigUpdate.forEach(callback => callback());
    };
    let onConfigUpdate = [];
    onConfigUpdate.push(function() {
        config.cols = Math.max(1, config.cols);
        config.rows = Math.max(1, config.rows);
        config.app.width = Math.max(1, config.app.width);
        config.app.height = Math.max(1, config.app.height);
        config.symbol.width = Math.max(1, config.symbol.width);
        config.symbol.height = Math.max(1, config.symbol.height);
    });

    let textures = {
        bg: null,
        symbols: []
    };

    let types = {
        cols: 'integer',
        rows: 'integer',
    };

    let config = {
        app: {
            width: 1280,
            height: 720
        },

        cols: 5,
        rows: 3,

        symbol: {
            width: 160,
            height: 160
        },

        reel: {
            gapV: 5,
            gapH: 5
        },

        reels: {
            x: 640,
            y: 360
        },

        maskPadding: 10
    };

    function init() {
        let wrapper = document.querySelector('.wrapper');
        let root = document.querySelector('.root');

        const empty = 'data:image/png;base64,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';

        let stage = new Container();
        document.querySelector('.root').appendChild(stage.element);

        let bg = new Sprite();
        stage.addChild(bg);

        let board = new Container();
        stage.addChild(board);

        function generateBoard() {
            if (board) {
                board.destroy({children: true});
            }
            board = new Container();
            stage.addChild(board);

            let [cols, rows] = [Math.floor(Math.max(1, config.cols)), Math.floor(Math.max(1, config.rows))];

            let width = (cols * config.symbol.width + (cols - 1) * config.reel.gapH);
            let height = (rows * config.symbol.height + (rows - 1) * config.reel.gapV);

            let reels = new Container();
            board.addChild(reels);

            reels.y = config.maskPadding;

            let x = config.symbol.width / 2;
            for (let col = 0; col < cols; ++col) {
                let reel = new Container();
                reel.x = x;
                x += config.reel.gapH + config.symbol.width;
                reels.addChild(reel);
                let y = config.symbol.height / 2 - (config.reel.gapV + config.symbol.height);
                for (let row = 0; row < rows + 2; ++row) {
                    let symbol = new Sprite();
                    symbol.anchorX = symbol.anchorY = 0.5;
                    symbol.x = 0;
                    symbol.y = y;
                    y += config.reel.gapV + config.symbol.height;
                    reel.addChild(symbol);
                    if (textures.symbols && textures.symbols.length) {
                        symbol.texture = textures.symbols[Math.floor(Math.random() * textures.symbols.length)];
                    } else {
                        symbol.texture = empty;
                    }
                }
            }

            board.x = config.reels.x - (width) / 2;
            board.y = config.reels.y - (height) / 2;

            board.element.style.width = `${width}px`;
            board.element.style.height = `${height + 2 * config.maskPadding}px`;
            board.element.style.overflow = 'hidden';

            // board.element.style.paddingTop = `${config.maskPadding}px`;
            // board.element.style.marginTop = `${-config.maskPadding}px`;
            // board.element.style.paddingBottom = `${config.maskPadding}px`;
            // board.element.style.marginBottom = `${-config.maskPadding}px`;

            // create scrolling items

            reels.children.forEach(reel => {
                // create buttons
                let upButton = document.createElement('div');
                upButton.style.position = 'absolute';
                upButton.style.width = `${config.symbol.width}px`;
                upButton.style.height = `${height / 2}px`;
                upButton.style.left = `${reel.x - config.symbol.width / 2}px`;
                upButton.style.top = '0';
                reels.element.appendChild(upButton);

                let downButton = document.createElement('div');
                downButton.style.position = 'absolute';
                downButton.style.width = `${config.symbol.width}px`;
                downButton.style.height = `${height / 2}px`;
                downButton.style.left = upButton.style.left;
                downButton.style.top = `${height / 2}px`;
                reels.element.appendChild(downButton);

                let dY = config.reel.gapV + config.symbol.height;
                upButton.onclick = () => {
                    createjs.Tween.get(reel, {override: true})
                        .to({y: -dY}, Math.abs(dY + reel.y) / dY * 500)
                        .to({y: 0})
                        .call(() => {
                            let child = reel.children[0];
                            reel.removeChild(child);
                            reel.addChild(child);

                            const startY = config.symbol.height / 2 - (config.reel.gapV + config.symbol.height);
                            reel.children.forEach((symbol, i) => {
                                symbol.y = startY + dY * i;
                            });

                            if (textures.symbols && textures.symbols.length) {
                                child.texture = textures.symbols[Math.floor(Math.random() * textures.symbols.length)];
                            } else {
                                child.texture = empty;
                            }
                        });
                };
                downButton.onclick = () => {
                    createjs.Tween.get(reel, {override: true})
                        .to({y: dY}, Math.abs(dY - reel.y) / dY * 500)
                        .to({y: 0})
                        .call(() => {
                            let child = reel.children[reel.children.length - 1];
                            reel.removeChild(child);
                            reel.addChildAt(child, 0);

                            const startY = config.symbol.height / 2 - (config.reel.gapV + config.symbol.height);
                            reel.children.forEach((symbol, i) => {
                                symbol.y = startY + dY * i;
                            });

                            if (textures.symbols && textures.symbols.length) {
                                child.texture = textures.symbols[Math.floor(Math.random() * textures.symbols.length)];
                            } else {
                                child.texture = empty;
                            }
                        });
                };
            });
        }

        let resize = () => {
            let [width, height] = [window.innerWidth, window.innerHeight];
            [width, height] = [wrapper.clientWidth, wrapper.clientHeight];
            root.style.transform = `translate(-50%, -50%) scale(${Math.min(width / config.app.width, height / config.app.height)})`;// `;
        };
        window.addEventListener('resize', resize);

        onConfigUpdate.push(function() {
            bg.texture = textures.bg;
            generateBoard();
            resize();
            root.style.width = `${config.app.width}px`;
            root.style.height = `${config.app.height}px`;
        });


        initDrop();

        initConfig();

        updateConfig();
        window.b = board;
    }

    function initDrop() {
        function handleFile(f) {
            if (f.type === 'image/png' || f.type === 'image/jpeg') {
                let reader = new window.FileReader();
                reader.readAsDataURL(f);
                reader.onloadend = function() {
                    let src = reader.result;
                    let img = new Image();
                    img.onload = function(){
                        if (img.width > 500) {
                            // assume its bg
                            textures.bg = src;
                            updateConfig();
                        } else {
                            textures.symbols = textures.symbols || [];
                            textures.symbols.push(src);
                            updateConfig();
                        }
                    };
                    img.src = src;
                }
            }
        }

        let dropZone = document.querySelector('body');
        dropZone.ondragover = function(event) {
            event.preventDefault();
        };
        dropZone.ondrop = function(event) {
            event.preventDefault();
            // If dropped items aren't files, reject them
            let dt = event.dataTransfer;
            if (dt.items) {
                // Use DataTransferItemList interface to access the file(s)
                for (let i = 0; i < dt.items.length; ++i) {
                    if (dt.items[i].kind === 'file') {
                        let f = dt.items[i].getAsFile();
                        handleFile(f);
                    }
                }
            } else {
                // Use DataTransfer interface to access the file(s)
                for (let i = 0; i < dt.files.length; ++i) {
                    let f = dt.files[i];
                    handleFile(f);
                }
            }

        }
    }

    function initConfig() {
        let gui = new dat.GUI();

        function add(root, folder, types) {
            gui.remember(root);
            for (let key in root) {
                if (!root.hasOwnProperty(key)) continue;
                if (root[key] && typeof root[key] === 'object') {
                    add(root[key], folder.addFolder(key), types[key] || {});
                } else {
                    let prop = folder.add(root, key);
                    prop.onChange(updateConfig);
                    if (types[key] === 'integer') {
                        prop.step(1);
                    }
                }
            }
        }

        add(config, gui, types);
    }

    window.addEventListener('load', init);
}());

