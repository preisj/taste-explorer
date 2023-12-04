import { HeaderTemplate } from "../../templates/HeaderTemplate";


export function FAQ() {
    return (
        <HeaderTemplate>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">FAQ</h1>
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">
                        Como funciona o aplicativo de gestão de despensa e receitas?
                    </h2>
                    <p>
                        Nosso aplicativo simplifica o processo de organização dos seus
                        alimentos e criação de refeições. Aqui está como ele funciona:
                    </p>
                    <ol className="list-decimal pl-6 mt-2 mb-4">
                        <li>
                            Adicione produtos à sua despensa, incluindo o nome, a data de
                            validade e a quantidade.
                        </li>
                        <li>
                            Receba notificações quando os itens da sua despensa estiverem
                            acabando.
                        </li>
                        <li>
                            Explore uma ampla variedade de receitas com base nos ingredientes
                            disponíveis na sua despensa.
                        </li>
                        <li>
                            Personalize seu perfil com restrições dietéticas e preferências
                            pessoais para receber recomendações de receitas personalizadas.
                        </li>
                        <li>
                            Junte-se à nossa comunidade de compartilhamento de receitas para
                            publicar suas criações culinárias e descobrir novas ideias.
                        </li>
                        <li>
                            Utilize a integração com o Google Maps para encontrar mercados
                            próximos e receber sugestões diárias de pratos.
                        </li>
                    </ol>
                </div>
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">
                        Quais recursos estão disponíveis no aplicativo?
                    </h2>
                    <p>Nosso aplicativo oferece os seguintes recursos:</p>
                    <ul className="list-disc pl-6 mt-2 mb-4">
                        <li>
                            Gestão de despensa com notificações para itens com baixo estoque.
                        </li>
                        <li>
                            Sugestões de receitas com base nos ingredientes da sua despensa.
                        </li>
                        <li>
                            Perfis de usuário personalizáveis com restrições alimentares e
                            preferências.
                        </li>
                        <li>
                            Uma comunidade de compartilhamento de receitas para postar e
                            descobrir novas receitas.
                        </li>
                        <li>
                            Integração com o Google Maps para encontrar mercados próximos.
                        </li>
                        <li>Sugestões diárias de pratos para suas aventuras culinárias.</li>
                    </ul>
                </div>
            </div>
        </HeaderTemplate>
    );
}

export default FAQ;