using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using Microsoft.Web.WebView2.Core;
using System.Runtime.InteropServices;

namespace WebExp
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// https://docs.microsoft.com/ja-jp/microsoft-edge/webview2/get-started/wpf
    /// </summary>
    public partial class MainWindow : Window
    {
        // JavaScriptで呼ぶ関数を保持するオブジェクト
        private JsToCs CsClass = new JsToCs();

        public MainWindow()
        {
            InitializeComponent();

            InitializeWebViewAsync();
        }

        async void InitializeWebViewAsync()
        {
            await webView.EnsureCoreWebView2Async(null);
            //webView.CoreWebView2.WebMessageReceived += CoreWebView2_WebMessageReceived;

            LoadPath(Environment.CurrentDirectory+$"/Assets/index.html");

            //JavaScriptからC#のメソッドが実行できる様に仕込む
            webView.CoreWebView2.AddHostObjectToScript("class", CsClass);

        }

        private void CoreWebView2_WebMessageReceived(object sender, CoreWebView2WebMessageReceivedEventArgs e)
        {
            //textEditor.Text = e.TryGetWebMessageAsString();
        }

        public  void LoadPath(string path)
        {
            // 実行ディレクトリを取得
            var currentDirectory = Environment.CurrentDirectory;

            // ローカルファイルのURIを作成
            var uri = new Uri($"{currentDirectory}/Assets/index.html");

            // WebView2にローカルファイルのURIを設定
            webView.CoreWebView2.Navigate(uri.AbsoluteUri);

        }

        /// <summary>WebView2に読み込ませるためのJsで実行する関数を保持させたクラス</summary>
        [ComVisible(true)]
        public class JsToCs
        {
            public void MessageShow(string strText)
            {
                Console.WriteLine("Jsからの呼び出し>" + strText);
                //MessageBox.Show("Jsからの呼び出し>" + strText);
            }
        }
    }
}
