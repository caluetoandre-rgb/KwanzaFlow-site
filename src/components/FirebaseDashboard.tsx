import { useState, useEffect, FormEvent } from 'react';
import { auth, googleProvider, db } from '../lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { ShieldCheck, LogIn, LogOut, Plus, Trash2, DollarSign, Users, Database, Sparkles, CheckCircle2 } from 'lucide-react';
import firebaseConfig from '../../firebase-applet-config.json';

interface Transaction {
  id: string;
  userId: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

interface KixikilaGroup {
  id: string;
  name: string;
  contributionAmount: number;
  frequency: string;
  membersCount: number;
  creatorId: string;
}

export function FirebaseDashboard() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [kixikilas, setKixikilas] = useState<KixikilaGroup[]>([]);
  const [activeSubTab, setActiveSubTab] = useState<'transacoes' | 'kixikila' | 'status'>('transacoes');

  // Form states for transaction
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('Alimentação');

  // Form states for Kixikila
  const [groupName, setGroupName] = useState('');
  const [contribution, setContribution] = useState('');
  const [frequency, setFrequency] = useState('Mensal');
  const [membersCount, setMembersCount] = useState('5');

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
      if (currentUser) {
        fetchData(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      setErrorMsg('');
      await signInWithPopup(auth, googleProvider);
      setSuccessMsg('Autenticado com sucesso via Firebase Auth!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Erro ao autenticar com Google.');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setTransactions([]);
    setKixikilas([]);
  };

  const fetchData = async (uid: string) => {
    try {
      // Fetch Transactions
      const txQuery = query(collection(db, 'transactions'), where('userId', '==', uid));
      const txSnapshot = await getDocs(txQuery);
      const txList: Transaction[] = txSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Transaction[];
      setTransactions(txList);

      // Fetch Kixikilas
      const kixSnapshot = await getDocs(collection(db, 'kixikilas'));
      const kixList: KixikilaGroup[] = kixSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as KixikilaGroup[];
      setKixikilas(kixList);
    } catch (err) {
      console.error('Erro ao buscar dados do Firestore:', err);
    }
  };

  const handleAddTransaction = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!title || !amount) {
      setErrorMsg('Preencha o título e o valor em Kwanzas.');
      return;
    }
    try {
      const newTx = {
        userId: user.uid,
        title,
        amount: parseFloat(amount),
        type,
        category,
        date: new Date().toISOString().split('T')[0]
      };
      const docRef = await addDoc(collection(db, 'transactions'), newTx);
      setTransactions(prev => [...prev, { id: docRef.id, ...newTx }]);
      setTitle('');
      setAmount('');
      setSuccessMsg('Transação adicionada com sucesso no Firestore!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'transactions', id));
      setTransactions(prev => prev.filter(t => t.id !== id));
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  const handleAddKixikila = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!groupName || !contribution) {
      setErrorMsg('Preencha o nome do grupo e o valor da quota.');
      return;
    }
    try {
      const newGroup = {
        name: groupName,
        contributionAmount: parseFloat(contribution),
        frequency,
        membersCount: parseInt(membersCount) || 5,
        creatorId: user.uid
      };
      const docRef = await addDoc(collection(db, 'kixikilas'), newGroup);
      setKixikilas(prev => [...prev, { id: docRef.id, ...newGroup }]);
      setGroupName('');
      setContribution('');
      setSuccessMsg('Kixikila comunitária criada com sucesso no Firestore!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Banner */}
      <div className="bg-[#0f172a] text-white rounded-2xl p-6 sm:p-8 shadow-xl mb-8 border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-500/20">
            <Database className="w-3.5 h-3.5" />
            <span>Firebase Cloud Conectado</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">SiteKwanzaFlow Cloud</h1>
          <p className="text-slate-300 text-sm mt-1">
            Projeto ID: <strong className="text-emerald-400 font-mono">{firebaseConfig.projectId}</strong> • Sincronização em tempo real com Firestore.
          </p>
        </div>

        {/* Auth status box */}
        <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl w-full md:w-auto flex items-center justify-between md:justify-start gap-4">
          {loadingAuth ? (
            <div className="text-xs text-slate-400">Verificando sessão...</div>
          ) : user ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-white text-base">
                {user.displayName ? user.displayName[0].toUpperCase() : 'U'}
              </div>
              <div>
                <div className="text-xs font-bold text-white">{user.displayName || 'Utilizador KwanzaFlow'}</div>
                <div className="text-[11px] text-emerald-400 font-mono">{user.email}</div>
              </div>
              <button
                onClick={handleLogout}
                className="ml-4 bg-slate-700 hover:bg-rose-600 text-slate-200 hover:text-white p-2 rounded-lg text-xs transition-colors flex items-center gap-1 cursor-pointer"
                title="Sair da conta"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          ) : (
            <button
              onClick={handleGoogleLogin}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow transition-all cursor-pointer w-full justify-center"
            >
              <LogIn className="w-4 h-4" />
              <span>Entrar com Conta Google</span>
            </button>
          )}
        </div>
      </div>

      {errorMsg && (
        <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {!user ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center max-w-xl mx-auto shadow-sm space-y-4">
          <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-[#10b981]">
            <Sparkles className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Acesse sua Conta KwanzaFlow Cloud</h2>
          <p className="text-sm text-slate-600">
            Faça login com sua conta do Google para gerenciar transações em Kwanzas (AOA) e criar grupos Kixikila sincronizados na nuvem do Firebase Firestore.
          </p>
          <button
            onClick={handleGoogleLogin}
            className="mt-4 bg-[#10b981] hover:bg-[#059669] text-white font-bold py-3 px-6 rounded-xl text-sm inline-flex items-center gap-2 shadow cursor-pointer transition-all"
          >
            <LogIn className="w-4 h-4" />
            <span>Entrar com Google Agora</span>
          </button>
        </div>
      ) : (
        <div>
          {/* Sub-navigation tabs */}
          <div className="flex border-b border-slate-200 mb-6 gap-2">
            <button
              onClick={() => setActiveSubTab('transacoes')}
              className={`pb-3 px-4 font-semibold text-sm border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                activeSubTab === 'transacoes'
                  ? 'border-[#10b981] text-[#10b981]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>Transações & Orçamento (AOA)</span>
            </button>
            <button
              onClick={() => setActiveSubTab('kixikila')}
              className={`pb-3 px-4 font-semibold text-sm border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                activeSubTab === 'kixikila'
                  ? 'border-[#10b981] text-[#10b981]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Kixikilas Comunitárias</span>
            </button>
            <button
              onClick={() => setActiveSubTab('status')}
              className={`pb-3 px-4 font-semibold text-sm border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                activeSubTab === 'status'
                  ? 'border-[#10b981] text-[#10b981]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Status do Projeto</span>
            </button>
          </div>

          {/* Sub-tab 1: Transactions */}
          {activeSubTab === 'transacoes' && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-xs text-slate-500 font-semibold uppercase">Total Receitas</div>
                  <div className="text-2xl font-black text-emerald-600 mt-1">
                    {totalIncome.toLocaleString()} Kz
                  </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-xs text-slate-500 font-semibold uppercase">Total Despesas</div>
                  <div className="text-2xl font-black text-rose-600 mt-1">
                    {totalExpense.toLocaleString()} Kz
                  </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-xs text-slate-500 font-semibold uppercase">Saldo Disponível</div>
                  <div className={`text-2xl font-black mt-1 ${balance >= 0 ? 'text-[#0f172a]' : 'text-rose-600'}`}>
                    {balance.toLocaleString()} Kz
                  </div>
                </div>
              </div>

              {/* Add Transaction Form */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-emerald-600" />
                  <span>Nova Transação Financeira</span>
                </h3>
                <form onSubmit={handleAddTransaction} className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Título</label>
                    <input
                      type="text"
                      placeholder="Ex: Venda de Mercadoria"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Valor (Kwanzas)</label>
                    <input
                      type="number"
                      placeholder="Ex: 25000"
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Tipo</label>
                    <select
                      value={type}
                      onChange={e => setType(e.target.value as 'income' | 'expense')}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:border-emerald-500 bg-white"
                    >
                      <option value="income">Receita (Entrada)</option>
                      <option value="expense">Despesa (Saída)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Categoria</label>
                    <input
                      type="text"
                      placeholder="Ex: Alimentação / Negócio"
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-bold py-2.5 px-4 rounded-lg text-sm shadow cursor-pointer transition-all"
                    >
                      Adicionar
                    </button>
                  </div>
                </form>
              </div>

              {/* Transactions List */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-slate-100 font-bold text-slate-900 text-sm">
                  Histórico de Transações Sincronizadas ({transactions.length})
                </div>
                {transactions.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-sm">
                    Nenhuma transação registada no Firestore ainda. Adicione a primeira acima!
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {transactions.map(t => (
                      <div key={t.id} className="px-6 py-3.5 flex items-center justify-between hover:bg-slate-50/50">
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{t.title}</div>
                          <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                            <span className="bg-slate-100 px-2 py-0.5 rounded">{t.category}</span>
                            <span>•</span>
                            <span>{t.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`font-black text-sm ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {t.type === 'income' ? '+' : '-'}{t.amount.toLocaleString()} Kz
                          </span>
                          <button
                            onClick={() => handleDeleteTransaction(t.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                            title="Excluir transação"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Sub-tab 2: Kixikilas */}
          {activeSubTab === 'kixikila' && (
            <div className="space-y-6">
              {/* Create Kixikila Form */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>Criar Novo Grupo de Kixikila Comunitária</span>
                </h3>
                <form onSubmit={handleAddKixikila} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Nome do Grupo</label>
                    <input
                      type="text"
                      placeholder="Ex: Kixikila Família Viana"
                      value={groupName}
                      onChange={e => setGroupName(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Quota (Kwanzas)</label>
                    <input
                      type="number"
                      placeholder="Ex: 50000"
                      value={contribution}
                      onChange={e => setContribution(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Frequência</label>
                    <select
                      value={frequency}
                      onChange={e => setFrequency(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:border-emerald-500 bg-white"
                    >
                      <option value="Semanal">Semanal</option>
                      <option value="Mensal">Mensal</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-bold py-2.5 px-4 rounded-lg text-sm shadow cursor-pointer transition-all"
                    >
                      Criar Kixikila
                    </button>
                  </div>
                </form>
              </div>

              {/* Kixikilas List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {kixikilas.length === 0 ? (
                  <div className="col-span-2 bg-white rounded-2xl p-8 border border-slate-200 text-center text-slate-500 text-sm">
                    Nenhuma Kixikila registada no Firestore ainda. Crie a primeira acima!
                  </div>
                ) : (
                  kixikilas.map(k => (
                    <div key={k.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900 text-base">{k.name}</h4>
                        <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full">
                          {k.frequency}
                        </span>
                      </div>
                      <div className="text-sm text-slate-600 flex justify-between">
                        <span>Quota por participante:</span>
                        <strong className="text-slate-900">{k.contributionAmount.toLocaleString()} Kz</strong>
                      </div>
                      <div className="text-sm text-slate-600 flex justify-between">
                        <span>Participantes:</span>
                        <strong className="text-slate-900">{k.membersCount} pessoas</strong>
                      </div>
                      <div className="text-sm text-slate-600 flex justify-between pt-2 border-t border-slate-100">
                        <span>Total por ronda:</span>
                        <strong className="text-emerald-600 font-black">{(k.contributionAmount * k.membersCount).toLocaleString()} Kz</strong>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Sub-tab 3: Status */}
          {activeSubTab === 'status' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold text-slate-900">Detalhes da Conexão Firebase</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 font-semibold">Project ID</div>
                  <div className="font-mono font-bold text-slate-900 mt-1">{firebaseConfig.projectId}</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 font-semibold">Auth Domain</div>
                  <div className="font-mono font-bold text-slate-900 mt-1">{firebaseConfig.authDomain}</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 font-semibold">Firestore Database ID</div>
                  <div className="font-mono font-bold text-slate-900 mt-1">{firebaseConfig.firestoreDatabaseId}</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 font-semibold">Storage Bucket</div>
                  <div className="font-mono font-bold text-slate-900 mt-1">{firebaseConfig.storageBucket}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
