document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Lógica Segura de Animação (Fade In)
    const secoesAnimadas = document.querySelectorAll('.animar-scroll');

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visivel');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    secoesAnimadas.forEach(secao => {
        secao.classList.add('preparar-animacao');
        observer.observe(secao);
    });

    // 2. Lógica do Carrossel (Automático habilitado junto com a Scrollbar)
    const track = document.getElementById('carrosselTrack');
    if (track) {
        const scrollAmount = 320; 
        let autoPlayInterval;

        const moverDireita = () => {
            if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
                track.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                track.scrollBy({ top: 0, left: scrollAmount, behavior: 'smooth' });
            }
        };

        const iniciarCarrossel = () => {
            autoPlayInterval = setInterval(moverDireita, 3000);
        };

        const pararCarrossel = () => {
            clearInterval(autoPlayInterval);
        };

        iniciarCarrossel();
        track.addEventListener('mouseenter', pararCarrossel);
        track.addEventListener('mouseleave', iniciarCarrossel);
        track.addEventListener('touchstart', pararCarrossel); // Pausa ao tocar na tela (Mobile)
    }

    // 3. Lógica do Modal de Projetos (Expansão na Tela)
    const modalOverlay = document.getElementById('projetoModal');
    const btnFechar = document.getElementById('btnFecharModal');
    
    // Referências dos textos no Modal
    const modalCat = document.getElementById('modalCat');
    const modalTit = document.getElementById('modalTit');
    const modalDesc = document.getElementById('modalDesc');
    const btnVisitar = document.getElementById('btnVisitarProjeto');

    // Captura todos os botões de "Ver mais"
    const botoesVerMais = document.querySelectorAll('.btn-ver-mais');

    botoesVerMais.forEach(botao => {
        botao.addEventListener('click', (e) => {
            // Encontra o card pai do botão clicado
            const card = e.target.closest('.projeto-card');
            
            // Pega os dados armazenados nos atributos 'data-' do card HTML
            const categoria = card.getAttribute('data-cat');
            const titulo = card.getAttribute('data-tit');
            const descricao = card.getAttribute('data-desc');

            // Preenche o modal com os dados
            modalCat.textContent = categoria;
            modalTit.textContent = titulo;
            modalDesc.textContent = descricao;
            
            // Configura o link de visitar (aqui pode ser ajustado depois para URLs dinâmicas)
            btnVisitar.href = "https://github.com/AdemarAg";

            // Mostra o Modal
            modalOverlay.classList.add('ativo');
        });
    });

    // Função para fechar modal
    const fecharModal = () => {
        modalOverlay.classList.remove('ativo');
    };

    btnFechar.addEventListener('click', fecharModal);

    // Fecha se o usuário clicar no fundo escuro fora da caixa
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            fecharModal();
        }
    });
});