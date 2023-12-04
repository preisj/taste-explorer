import { HeaderTemplate } from "../../templates/HeaderTemplate";


export function TermsAndConditions() {
    return (
        <HeaderTemplate>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Termos e Condições</h1>
                <p className="mb-8">
                    Por favor, leia atentamente estes termos e condições antes de usar
                    nosso aplicativo de livraria online.
                </p>
                <ol className="list-decimal pl-6 mb-8">
                    <li>
                        <h2 className="text-xl font-bold mb-2">Receitas</h2>
                        <p>
                            Embora façamos todo o esforço para garantir informações precisas
                            sobre as receitas, as informações fornecidas pelos usuários podem
                            estar erradas. Por esse motivo, reservamos o direito de excluir
                            qualquer receita.
                        </p>
                    </li>
                    <li>
                        <h2 className="text-xl font-bold mb-2">Privacidade</h2>
                        <p>
                            Valorizamos sua privacidade e tratamos suas informações pessoais
                            de acordo com nossa Política de Privacidade. Ao usar nosso
                            aplicativo, você consente a coleta e o uso de suas informações
                            conforme descrito na política.
                        </p>
                    </li>
                    <li>
                        <h2 className="text-xl font-bold mb-2">
                            Responsabilidades do Usuário
                        </h2>
                        <p>
                            Os usuários são responsáveis por manter a confidencialidade de
                            suas credenciais de conta e por qualquer atividade que ocorra em
                            sua conta. Os usuários devem fornecer informações precisas e
                            atualizadas durante o processo de registro.
                        </p>
                    </li>
                    <li>
                        <h2 className="text-xl font-bold mb-2">Leis</h2>
                        <p>
                            Estes termos e condições serão regidos e interpretados de acordo
                            com as leis brasileiras. Quaisquer disputas decorrentes ou
                            relacionadas a estes termos estarão sujeitas à jurisdição
                            exclusiva dos tribunais brasileiros.
                        </p>
                    </li>
                </ol>
            </div>
        </HeaderTemplate>
    );
}

export default TermsAndConditions;