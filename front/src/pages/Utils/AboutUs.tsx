import { HeaderTemplate } from "../../templates/HeaderTemplate";

export function AboutUs() {
    return (
        <HeaderTemplate>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Sobre nós</h1>
                <p className="mb-4">
                    No Taste Explorer, somos apaixonados por simplificar a sua experiência
                    culinária. Nosso aplicativo foi projetado para ajudá-lo a gerenciar
                    sua despensa e criar refeições deliciosas com base nos ingredientes
                    que você tem disponíveis.
                </p>
                <p className="mb-4">
                    Com o Taste Explorer, você pode acompanhar facilmente os itens da sua
                    despensa, incluindo seus nomes, datas de validade e quantidades. Até
                    mesmo enviaremos notificações úteis quando seus ingredientes estiverem
                    acabando.
                </p>
                <p className="mb-4">
                    Nosso aplicativo oferece uma ampla variedade de receitas adaptadas aos
                    ingredientes que você tem em sua despensa, reduzindo o desperdício de
                    alimentos e tornando o planejamento de refeições algo fácil.
                    Personalize seu perfil com restrições dietéticas e preferências
                    pessoais para receber recomendações de receitas personalizadas.
                </p>
                <p className="mb-4">
                    O Taste Explorer não é apenas um gerenciador de despensa; é uma
                    comunidade culinária. Junte-se à nossa plataforma de compartilhamento
                    de receitas, onde você pode compartilhar suas criações culinárias,
                    descobrir novas receitas e se conectar com outros entusiastas da
                    gastronomia. Utilize nossa integração com o Google Maps para encontrar
                    mercados próximos e receber sugestões diárias de receitas.
                </p>
                <p className="mb-4">
                    Obrigado por escolher o Taste Explorer para revolucionar a gestão
                    culinária diária. Vamos explorar o mundo dos sabores e tornar o ato de
                    cozinhar uma aventura prazerosa!
                </p>
            </div>
        </HeaderTemplate>
    );
}


export default AboutUs;