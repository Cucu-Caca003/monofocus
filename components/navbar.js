class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                nav {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background-color: rgba(0, 0, 0, 0.8);
                    backdrop-filter: blur(10px);
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    z-index: 100;
                    transition: all 0.3s ease;
                }
.nav-container {
                    display: flex;
                    justify-content: center;
                    max-width: 600px;
                    margin: 0 auto;
                }
                .nav-link {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 12px 16px;
                    text-decoration: none;
                    color: #fff;
                    opacity: 0.7;
                    transition: all 0.2s ease;
                    flex: 1;
                    text-align: center;
                }
.nav-link:hover {
                    opacity: 1;
                    background-color: rgba(255, 255, 255, 0.05);
                }
.nav-link.active {
                    opacity: 1;
                }
                
                .nav-icon {
                    width: 20px;
                    height: 20px;
                    margin-bottom: 4px;
                }
                
                .nav-text {
                    font-size: 12px;
                    font-weight: 500;
                }
            </style>
            <nav>
                <div class="nav-container">
                    <a href="index.html" class="nav-link">
                        <i data-feather="home" class="nav-icon"></i>
                        <span class="nav-text">Home</span>
                    </a>
                    <a href="notes.html" class="nav-link">
                        <i data-feather="edit-3" class="nav-icon"></i>
                        <span class="nav-text">Notes</span>
                    </a>
                    <a href="tasks.html" class="nav-link">
                        <i data-feather="check-square" class="nav-icon"></i>
                        <span class="nav-text">Tasks</span>
                    </a>
                </div>
            </nav>
        `;
    }
}

customElements.define('custom-navbar', CustomNavbar);