/*

    -----------------------
    UDP-Send
    -----------------------
    // [url]http://msdn.microsoft.com/de-de/library/bb979228.aspx#ID0E3BAC[/url]

    // > gesendetes unter
    // 127.0.0.1 : 8050 empfangen

    // nc -lu 127.0.0.1 8050

        // todo: shutdown thread at the end
*/
using UnityEngine;
using System.Collections;

using System;
using System.Text;
using System.Net;
using System.Net.Sockets;
using System.Threading;

public class UDPSend : MonoBehaviour
{
    private static int localPort;

    // prefs
    private string IP;  // define in init
    public int port;  // define in init

    // "connection" things
    IPEndPoint remoteEndPoint;
    UdpClient client;

    // gui
    string strMessage = "";


    // call it from shell (as program)
    private static void Main()
    {
        UDPSend sendObj = new UDPSend();
        sendObj.init();

        // testing via console
        // sendObj.inputFromConsole();

        // as server sending endless
        sendObj.sendEndless(" endless infos \n");

    }
    // start from unity3d
    public void Start()
    {
        init();
    }

    private void Update()
    {
        TraverseHierarchy(this.gameObject.transform);
    }

    void TraverseHierarchy(Transform root)
    {
        foreach (Transform child in root)
        {
            float px = child.transform.position.x;
            float py = child.transform.position.y;
            float pz = child.transform.position.z;
            float rx = child.transform.rotation.x;
            float ry = child.transform.rotation.y;
            float rz = child.transform.rotation.z;
            String msg = "{";
            msg += "\"name\":\"" + child.name + "\",";
            msg += "\"px\":" + px + ",";
            msg += "\"py\":" + py + ",";
            msg += "\"pz\":" + pz + ",";
            msg += "\"rx\":" + rx + ",";
            msg += "\"ry\":" + ry + ",";
            msg += "\"rz\":" + rz;
            msg += "}";
            Debug.Log(msg);
            sendString(msg);
            TraverseHierarchy(child);
        }
    }

    public void init()
    {
        // Endpunkt definieren, von dem die Nachrichten gesendet werden.
        print("UDPSend.init()");

        // define
        //IP = "127.0.0.1";
        IP = "35.240.86.53";
        //IP = "192.168.0.102";
        port = 7002;

        // ----------------------------
        // Senden
        // ----------------------------
        remoteEndPoint = new IPEndPoint(IPAddress.Parse(IP), port);
        client = new UdpClient();

        // status
        print("Sending to " + IP + " : " + port);
        print("Testing: nc -lu " + IP + " : " + port);

    }

    private void sendString(string message)
    {
        try
        {
            //if (message != "")
            //{

            // Daten mit der UTF8-Kodierung in das Binärformat kodieren.
            byte[] data = Encoding.UTF8.GetBytes(message);

            // Den message zum Remote-Client senden.
            client.Send(data, data.Length, remoteEndPoint);
            //}
        }
        catch (Exception err)
        {
            print(err.ToString());
        }
    }


    // endless test
    private void sendEndless(string testStr)
    {
        do
        {
            sendString(testStr);


        }
        while (true);

    }

}